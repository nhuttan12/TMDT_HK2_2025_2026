import { useState } from 'react';

export interface ChangePasswordLogicReturn {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
	showOld: boolean;
	showNew: boolean;
	showConfirm: boolean;
	dialogOpen: boolean;
	dialogMessage: string;
	isSubmitting: boolean;
	handleOldPasswordChange: (val: string) => void;
	handleNewPasswordChange: (val: string) => void;
	handleConfirmPasswordChange: (val: string) => void;
	handleToggleShowOld: () => void;
	handleToggleShowNew: () => void;
	handleToggleShowConfirm: () => void;
	handleCloseDialog: () => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useChangePasswordLogic(): ChangePasswordLogicReturn {
	const [showOld, setShowOld] = useState<boolean>(false);
	const [showNew, setShowNew] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

	const [oldPassword, setOldPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [dialogMessage, setDialogMessage] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const openDialog = (message: string): void => {
		setDialogMessage(message);
		setDialogOpen(true);
	};

	const handleCloseDialog = (): void => {
		setDialogOpen(false);
	};

	const handleToggleShowOld = (): void => setShowOld((prev: boolean) => !prev);
	const handleToggleShowNew = (): void => setShowNew((prev: boolean) => !prev);
	const handleToggleShowConfirm = (): void => setShowConfirm((prev: boolean) => !prev);

	const handleOldPasswordChange = (val: string): void => setOldPassword(val);
	const handleNewPasswordChange = (val: string): void => setNewPassword(val);
	const handleConfirmPasswordChange = (val: string): void => setConfirmPassword(val);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (!oldPassword || !newPassword || !confirmPassword) {
			openDialog('Vui lòng nhập đầy đủ thông tin');
			return;
		}

		if (newPassword.length < 6) {
			openDialog('Mật khẩu mới phải ít nhất 6 ký tự');
			return;
		}

		if (newPassword !== confirmPassword) {
			openDialog('Mật khẩu xác nhận không khớp');
			return;
		}

		try {
			setIsSubmitting(true);
			// Giả lập call API mất 1 giây
			await new Promise((resolve) => setTimeout(resolve, 1000));

			openDialog('Đổi mật khẩu thành công!');
			// Reset form
			setOldPassword('');
			setNewPassword('');
			setConfirmPassword('');
		} catch (error) {
			openDialog('Đã có lỗi xảy ra, vui lòng thử lại sau.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		oldPassword: oldPassword,
		newPassword: newPassword,
		confirmPassword: confirmPassword,
		showOld: showOld,
		showNew: showNew,
		showConfirm: showConfirm,
		dialogOpen: dialogOpen,
		dialogMessage: dialogMessage,
		isSubmitting: isSubmitting,
		handleOldPasswordChange: handleOldPasswordChange,
		handleNewPasswordChange: handleNewPasswordChange,
		handleConfirmPasswordChange: handleConfirmPasswordChange,
		handleToggleShowOld: handleToggleShowOld,
		handleToggleShowNew: handleToggleShowNew,
		handleToggleShowConfirm: handleToggleShowConfirm,
		handleCloseDialog: handleCloseDialog,
		handleSubmit: handleSubmit,
	};
}
