import { Button } from '@/components/ui/button';
import React, { JSX } from 'react';

interface Props {
	id: string;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}

export default function AdminTableAction({ id, onEdit, onDelete }: Props): JSX.Element {
	// Ngăn chặn sự kiện click lan truyền lên Row của Table
	const handleEdit = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.stopPropagation();
		onEdit(id);
	}

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.stopPropagation();
		onDelete(id);
	}

	return (
		<div className='flex items-center justify-end gap-2'>
			<Button
				variant='link'
				className='px-2 text-blue-600 hover:text-blue-700 font-medium cursor-pointer'
				onClick={handleEdit}
			>
				Sửa
			</Button>

			<Button
				variant='link'
				className='px-2 text-red-500 hover:text-red-600 font-medium cursor-pointer'
				onClick={handleDelete}
			>
				Xóa
			</Button>
		</div>
	);
}
