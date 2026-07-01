import { useChangePasswordMutation } from '@/queries/auth/use-change-password-mutation';
import { SyntheticEvent, useState } from 'react';

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
	handleSubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
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

    const changePasswordMutation = useChangePasswordMutation(); 

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

	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            // 4. Gọi API thông qua mutateAsync
            await changePasswordMutation.mutateAsync({
                oldPassword,
                newPassword
            });

            // 5. Xử lý khi thành công
            openDialog('Đổi mật khẩu thành công!');
            
            // Xóa rỗng các ô input
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            // 6. Xử lý khi thất bại (Bắt lỗi từ backend trả về)
            console.error(error);
        } finally {
            // 7. Tắt trạng thái loading
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
