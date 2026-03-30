'use client';

import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import React, { ChangeEvent, JSX } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableImage } from '@/components/image/admin/draggable-image';
import { Button } from '@/components/ui/button';
import ImagePreview from '@/components/image/admin/image-preview';
import { Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
	value: SortableImageForm[];
	onChange: React.Dispatch<React.SetStateAction<SortableImageForm[]>>;
	disabled?: boolean;
}

function fakeUpload(file: File, onProgress: (p: number) => void): Promise<string> {
	return new Promise((resolve) => {
		let progress = 0;

		const interval = setInterval(() => {
			progress += 10;
			onProgress(progress);

			if (progress >= 100) {
				clearInterval(interval);
				resolve(URL.createObjectURL(file)); // giả lập URL server
			}
		}, 100);
	});
}

export function MultiImageUpload({ value, onChange, disabled }: Props): JSX.Element {
	const FILE_INPUT_ID = 'multi-image-upload';

	const move = (from: number, to: number) => {
		const updated = [...value];
		const [moved] = updated.splice(from, 1);
		updated.splice(to, 0, moved);

		onChange(
			updated.map((img, i) => ({
				...img,
				order: i,
			})),
		);
	};

	const handleAdd = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const newItems: SortableImageForm[] = Array.from(files).map((file, i) => ({
			localID: crypto.randomUUID(),
			file,
			order: value.length + i,
			isPrimary: value.length === 0 && i === 0,
			status: 'uploading',
			progress: 0,
		}));

		// optimistic add
		onChange([...value, ...newItems]);

		// upload async
		await Promise.all(
			newItems.map(async (item: SortableImageForm): Promise<void> => {
				const url: string = await fakeUpload(item.file!, (p: number): void => {
					onChange((prev: SortableImageForm[]): SortableImageForm[] =>
						prev.map(
							(img: SortableImageForm): SortableImageForm =>
								img.localID === item.localID
									? {
											...img,
											progress: p,
										}
									: img,
						),
					);
				});

				onChange((prev: SortableImageForm[]): SortableImageForm[] =>
					prev.map(
						(img: SortableImageForm): SortableImageForm =>
							img.localID === item.localID
								? { ...img, status: 'done', imageUrl: url, file: undefined }
								: img,
					),
				);
			}),
		);

		e.target.value = '';
	};

	// const update = (updater: (imgs: SortableImageForm[]) => SortableImageForm[]) => {
	// 	onChange(updater(value));
	// };

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='space-y-4'>
				<Input
					id={FILE_INPUT_ID}
					type='file'
					accept='image/*'
					multiple
					className='hidden'
					onChange={handleAdd}
					disabled={disabled}
				/>

				<Label htmlFor={!disabled ? FILE_INPUT_ID : undefined}>
					<Button
						className='cursor-pointer'
						type='button'
						asChild
						disabled={disabled}
					>
						<span>Chọn ảnh</span>
					</Button>
				</Label>

				{value.map((img: SortableImageForm, index: number): JSX.Element => {
					const content: JSX.Element = (
						<div className='border p-3 rounded flex gap-4'>
							<ImagePreview
								img={img}
								width={96}
								height={96}
							/>

							<div className='flex flex-col gap-2'>
								{/* progress */}
								{img.status === 'uploading' && (
									<div className='text-sm'>Uploading... {img.progress}%</div>
								)}

								{/* primary */}
								{img.isPrimary && disabled ? (
									<Button
										variant={img.isPrimary ? 'secondary' : 'default'}
										onClick={() => {
											if (disabled) return;
											onChange(
												value.map((i: SortableImageForm, idx: number) => ({
													...i,
													isPrimary: idx === index,
												})),
											);
										}}
										disabled={disabled}
									>
										{img.isPrimary ? 'Ảnh chính' : 'Đặt làm ảnh chính'}
									</Button>
								) : (
									<></>
								)}

								{/* delete */}
								{disabled ? (
									<></>
								) : (
									<Button
										variant='outline'
										onClick={() => {
											if (disabled) return;
											onChange(value.filter((_, i) => i !== index));
										}}
										disabled={disabled}
									>
										Xoá ảnh
										<Trash />
									</Button>
								)}
							</div>
						</div>
					);

					if (disabled) {
						return <div key={img.localID}>{content}</div>;
					}

					return (
						<DraggableImage
							key={img.localID}
							img={img}
							index={index}
							move={move}
						>
							{content}
						</DraggableImage>
					);
				})}
			</div>
		</DndProvider>
	);
}
