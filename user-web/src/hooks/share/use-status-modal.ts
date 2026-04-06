import { ModalStatus } from '@/types/shared/ModalStatus';
import { useState } from 'react';

export interface UseStatusModalReturn {
	isOpen: boolean;
	status: ModalStatus;
	message: string;
	showSuccess: (msg: string) => void;
	showError: (msg: string) => void;
	showWarning: (msg: string) => void;
	showInfo: (msg: string) => void;
	showLoading: (msg: string) => void;
	closeModal: () => void;
}

export function useStatusModal(): UseStatusModalReturn {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [status, setStatus] = useState<ModalStatus>('info');
	const [message, setMessage] = useState<string>('');

	// Các Arrow Function Helpers giúp gom gọn thao tác gọi Modal
	const showSuccess = (msg: string): void => {
		setStatus('success');
		setMessage(msg);
		setIsOpen(true);
	};

	const showError = (msg: string): void => {
		setStatus('error');
		setMessage(msg);
		setIsOpen(true);
	};

	const showWarning = (msg: string): void => {
		setStatus('warning');
		setMessage(msg);
		setIsOpen(true);
	};

	const showInfo = (msg: string): void => {
		setStatus('info');
		setMessage(msg);
		setIsOpen(true);
	};

	const showLoading = (msg: string): void => {
		setStatus('loading');
		setMessage(msg);
		setIsOpen(true);
	};

	const closeModal = (): void => {
		setIsOpen(false);
	};

	return {
		isOpen: isOpen,
		status: status,
		message: message,
		showSuccess: showSuccess,
		showError: showError,
		showWarning: showWarning,
		showInfo: showInfo,
		showLoading: showLoading,
		closeModal: closeModal,
	};
}
