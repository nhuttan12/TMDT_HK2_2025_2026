import { Label } from '@/components/ui/label';
import { CategoryImage } from '@/types/images/admin/CategoryImage';
import { ChangeEvent, JSX } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getImageSrc } from '@/utils/images/getImageSrc';
import Image from 'next/image';

interface Props {
	value?: CategoryImage;
	onChange: (img?: CategoryImage) => void;
	disabled?: boolean;
}

export default function SingleImageUpload({ value, onChange, disabled }: Props): JSX.Element {
	const FILE_INPUT_ID = 'single-image-upload';

	const handleAdd = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		onChange({ file, imageUrl: undefined });
		e.target.value = '';
	};

	return (
		<div className='space-y-4'>
			<div className='flex justify-between'>
				<Input
					id={FILE_INPUT_ID}
					type='file'
					accept='image/*'
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
			</div>

			{value && (
				<div className='space-y-2'>
					<Image
						src={getImageSrc(value)!}
						alt=''
						width={128}
						height={128}
						className='w-40 h-40 object-cover border rounded'
					/>

					{disabled ? (
						<></>
					) : (
						<Button
							type='button'
							variant='destructive'
							onClick={() => onChange(undefined)}
							disabled={disabled}
						>
							Xoá
						</Button>
					)}
				</div>
			)}
		</div>
	);
}
