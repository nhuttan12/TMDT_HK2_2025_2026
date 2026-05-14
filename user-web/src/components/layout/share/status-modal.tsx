import { ModalStatus } from '@/types/shared/ModalStatus';
import { AlertTriangle, CheckCircle2, Info, Loader2, LucideIcon, XCircle } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { JSX } from 'react';

interface StatusModalProps {
	isOpen: boolean;
	onClose: () => void;
	status: ModalStatus;
	title: string;
	description?: string | React.ReactNode;
	children?: React.ReactNode; // Cho phép truyền thêm custom UI nếu cần
	confirmText?: string;
}

interface StatusConfig {
	icon: LucideIcon;
	colorClass: string;
	bgClass: string;
	iconClass?: string;
}

function getStatusConfig(status: ModalStatus): StatusConfig {
	switch (status) {
		case 'success':
			return {
				icon: CheckCircle2,
				colorClass: 'text-green-600 dark:text-green-500',
				bgClass: 'bg-green-100 dark:bg-green-950',
			};
		case 'error':
			return {
				icon: XCircle,
				colorClass: 'text-red-600 dark:text-red-500',
				bgClass: 'bg-red-100 dark:bg-red-950',
			};
		case 'warning':
			return {
				icon: AlertTriangle,
				colorClass: 'text-amber-600 dark:text-amber-500',
				bgClass: 'bg-amber-100 dark:bg-amber-950',
			};
		case 'loading':
			return {
				icon: Loader2,
				colorClass: 'text-slate-600 dark:text-slate-400',
				bgClass: 'bg-slate-100 dark:bg-slate-800',
				iconClass: 'animate-spin',
			};
		case 'info':
		default:
			return {
				icon: Info,
				colorClass: 'text-blue-600 dark:text-blue-500',
				bgClass: 'bg-blue-100 dark:bg-blue-950',
			};
	}
}

export function StatusModal({
	isOpen,
	onClose,
	status,
	title,
	description,
	children,
	confirmText = 'Đóng',
}: StatusModalProps): JSX.Element {
	// Lấy config tương ứng với status hiện tại
	const { icon: Icon, colorClass, bgClass } = getStatusConfig(status);

	const isLoading: boolean = status === 'loading';

	// Xử lý chặn đóng Modal khi đang loading
	const handleOpenChange = (open: boolean): void => {
		if (isLoading) return; // Nếu đang loading thì cấm đóng

		if (!open) {
			onClose();
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleOpenChange}
		>
			<DialogContent
				className='sm:max-w-md text-center flex flex-col items-center justify-center p-6'
				onInteractOutside={(e: Event): void => {
					if (isLoading) e.preventDefault();
				}}
				onEscapeKeyDown={(e: KeyboardEvent): void => {
					if (isLoading) e.preventDefault();
				}}
			>
				{/* Vùng chứa Icon có background tròn */}
				<div className={`p-3 rounded-full mb-4 ${bgClass}`}>
					<Icon className={`w-10 h-10 ${colorClass}`} />
				</div>

				<DialogHeader className='flex flex-col items-center'>
					<DialogTitle className='text-xl font-semibold text-slate-900 dark:text-slate-100'>
						{title}
					</DialogTitle>

					{description && (
						<DialogDescription className='text-center mt-2 text-slate-500 dark:text-slate-400'>
							{description}
						</DialogDescription>
					)}
				</DialogHeader>

				{/* Vùng chứa Custom Content (nếu truyền vào) */}
				{children && <div className='w-full mt-4'>{children}</div>}

				{/* Chỉ render nút Đóng khi không phải trạng thái loading */}
				{!isLoading && (
					<div className='w-full mt-6 flex justify-center'>
						<Button
							variant='outline'
							onClick={onClose}
							className='min-w-30 cursor-pointer'
						>
							{confirmText}
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
