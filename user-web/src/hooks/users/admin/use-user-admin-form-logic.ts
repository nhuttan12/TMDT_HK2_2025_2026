import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { UserRole } from '@/types/users/UserRole';

export interface UseUserAdminFormLogicProps {
	initialData: UserDetailInfoAdmin;
	formType: AdminFormType;
}

export interface UseUserAdminFormLogicReturn {
	form: UserDetailInfoAdmin;
	isView: boolean;
	isCreate: boolean;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleStatusChange: (checked: boolean) => void;
	handleSubmit: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
}

export function useUserAdminFormLogic(
	props: UseUserAdminFormLogicProps,
): UseUserAdminFormLogicReturn {
	const [form, setForm] = useState<UserDetailInfoAdmin>(props.initialData);

	const isView: boolean = props.formType === 'view';
	const isCreate: boolean = props.formType === 'create';

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setForm(
			(prev: UserDetailInfoAdmin): UserDetailInfoAdmin => ({
				...prev,
				[name]: value,
			}),
		);
	};

	const handleStatusChange = (checked: boolean): void => {
		setForm(
			(prev: UserDetailInfoAdmin): UserDetailInfoAdmin => ({
				...prev,
				status: checked,
			}),
		);
	};

	const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>): void => {
		e.preventDefault();
		console.log('Call API Submit User:', form);
	};

	return {
		form,
		isView,
		isCreate,
		handleInputChange,
		handleStatusChange,
		handleSubmit,
	};
}
