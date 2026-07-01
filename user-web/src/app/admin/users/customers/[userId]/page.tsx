import UserAdminFormContainer from '@/app/admin/users/_components/user-admin-form-container';
import apiServer from '@/lib/api-server';
import {
    UserAdminService
} from '@/services/users/admin/user-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Quản lý thông tin chi tiết khách hàng',
};

interface Props {
	params: Promise<{ userId: string }>;
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const { userId } = await params;

    console.log('userId: ', userId);
	
    const userAdminService = new UserAdminService(apiServer);

	// Fetch data tại Server
	const initialData = await userAdminService.getUserDetailAdminById(userId);

    console.log('initialData: ', initialData);

	return (
		<UserAdminFormContainer
			userId={userId}
			formType='view'
			initialData={initialData}
		/>
	);
}
