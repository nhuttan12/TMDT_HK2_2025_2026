import { JSX } from 'react';
import { getUserDetailAdminById } from '@/services/users/admin/user-service';
import UserAdminFormContainer from '@/app/admin/users/_components/user-admin-form-container';
import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý khách hàng',
};

interface Props {
	params: Promise<{ userId: string }>;
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const { userId } = await params;

	// Fetch data tại Server
	const initialData: UserDetailInfoAdmin = await getUserDetailAdminById(userId);

	return (
		<UserAdminFormContainer
			userId={userId}
			formType='view'
			initialData={initialData}
		/>
	);
}
