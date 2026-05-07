'use client';

import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import React, { ChangeEvent, JSX, useId } from 'react';
import { SortableImageItem } from '@/components/image/admin/sortable-image-item';
import { Button } from '@/components/ui/button';
import ImagePreview from '@/components/image/admin/image-preview';
import { Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { isDragging } from 'motion-dom';

interface Props {
	value: SortableImageForm[];
	onChange: React.Dispatch<React.SetStateAction<SortableImageForm[]>>;
	disabled?: boolean;
	width?: number | null;
	height?: number | null;
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

export function MultiImageUpload({ value, onChange, disabled, width, height }: Props): JSX.Element {
	const FILE_INPUT_ID = 'multi-image-upload';

	const dndId: string = useId();

	// Xử lý fallback về giá trị mặc định (96) nếu width/height là null hoặc undefined
	const finalWidth: number = width ?? 96;
	const finalHeight: number = height ?? 96;

	// 1. Cấu hình Cảm biến (Sensors)
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5, // Bắt buộc chuột di chuyển 5px mới tính là kéo (chống click nhầm)
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	// 2. Logic xử lý khi kết thúc kéo thả (Thay thế cho hàm move cũ)
	const handleDragEnd = (event: DragEndEvent): void => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex: number = value.findIndex(
				(item: SortableImageForm): boolean => item.localId === active.id,
			);
			const newIndex: number = value.findIndex(
				(item: SortableImageForm): boolean => item.localId === over.id,
			);

			// arrayMove tự động đổi chỗ 2 phần tử trong mảng
			const updated: SortableImageForm[] = arrayMove(value, oldIndex, newIndex);

			// Cập nhật lại thuộc tính order
			onChange(
				updated.map((img: SortableImageForm, i: number) => ({
					...img,
					order: i,
				})),
			);
		}
	};

	const handleAdd = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const newItems: SortableImageForm[] = Array.from(files).map((file, i) => ({
			localId: crypto.randomUUID(),
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
								img.localId === item.localId
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
							img.localId === item.localId
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
					className={`cursor-pointer ${disabled ? 'opacity-50' : ''}`}
					type='button'
					asChild
					disabled={disabled}
				>
					<span>Chọn ảnh</span>
				</Button>
			</Label>

			{/* 4. Khởi tạo Context cho DND Kit */}
			<DndContext
				id={dndId}
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={value.map((img: SortableImageForm): string => img.localId)} // Map mảng string ID
					strategy={verticalListSortingStrategy}
				>
					<div className='flex flex-col gap-4'>
						{value.map((img: SortableImageForm, index: number): JSX.Element => {
							// Giữ nguyên UI Content của bạn
							const content: JSX.Element = (
								<div
									className={`border p-3 rounded flex gap-4 bg-white ${isDragging ? 'shadow-lg' : ''}`}
								>
									<div
										className='flex items-center justify-center bg-gray-100 rounded-md overflow-hidden relative'
										style={{
											width: `${finalWidth}px`,
											height: `${finalHeight}px`,
											// Đảm bảo khung không bị bóp méo bởi Flexbox
											minWidth: `${finalWidth}px`,
											minHeight: `${finalHeight}px`,
										}}
									>
										<ImagePreview
											img={img}
											width={finalWidth}
											height={finalHeight}
										/>
									</div>

									<div className='flex flex-col gap-2'>
										{img.status === 'uploading' && (
											<div className='text-sm text-blue-600 font-medium'>
												Uploading... {img.progress}%
											</div>
										)}

										{img.isPrimary && (
											<span className='text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded w-fit'>
												Ảnh chính
											</span>
										)}

										{!img.isPrimary && !disabled && (
											<Button
												variant='secondary'
												size='sm'
												onClick={(e) => {
													e.stopPropagation(); // Ngăn sự kiện kéo thả khi click nút
													onChange(
														value.map(
															(
																i: SortableImageForm,
																idx: number,
															) => ({
																...i,
																isPrimary: idx === index,
															}),
														),
													);
												}}
											>
												Đặt làm ảnh chính
											</Button>
										)}

										{!disabled && (
											<Button
												variant='destructive'
												size='sm'
												className='w-fit'
												onClick={(e) => {
													e.stopPropagation(); // Ngăn sự kiện kéo thả khi click nút
													onChange(value.filter((_, i) => i !== index));
												}}
											>
												Xoá ảnh <Trash className='w-4 h-4 ml-2' />
											</Button>
										)}
									</div>
								</div>
							);

							// Trả về SortableItem thay vì DraggableImage
							return (
								<SortableImageItem
									key={img.localId}
									id={img.localId}
									disabled={disabled || img.status === 'uploading'} // Chặn kéo thả các item đang upload
								>
									{content}
								</SortableImageItem>
							);
						})}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
}
