import React, { JSX } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Props {
	isOpen: boolean;
	title: string;
	description: string;
	onClose: () => void;
	onConfirm: () => void;
}

export default function DeleteConfirmModal(props: Props): JSX.Element {
	const { isOpen, title, description, onClose, onConfirm }: Props = props;

	function handleOpenChange(open: boolean): void {
		if (!open) {
			onClose();
		}
	}

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={handleOpenChange}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>Hủy</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						className='bg-red-500 hover:bg-red-600 text-white'
					>
						Xác nhận xóa
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}