import { JSX } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

interface Props {
	id: number;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
}

export default function GoodsIssueActions({ id, onEdit, onDelete }: Props): JSX.Element {
	function handleEdit(e: React.MouseEvent<HTMLDivElement>): void {
		e.stopPropagation();
		onEdit(id);
	}

	function handleDelete(e: React.MouseEvent<HTMLDivElement>): void {
		e.stopPropagation();
		onDelete(id);
	}

	return (
		<div className='text-right'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						className='h-8 w-8'
					>
						<MoreHorizontal size={16} />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align='end'>
					<DropdownMenuItem onClick={handleEdit}>
						<Pencil
							size={14}
							className='mr-2'
						/>
						Chỉnh sửa
					</DropdownMenuItem>

					<DropdownMenuItem
						className='text-red-500 focus:text-red-500'
						onClick={handleDelete}
					>
						<Trash
							size={14}
							className='mr-2'
						/>
						Xóa
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
