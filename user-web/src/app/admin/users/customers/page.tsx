import UserAdminContainer from '@/app/admin/users/_components/user-admin-container';
import apiServer from '@/lib/api-server';
import { UserAdminService } from '@/services/users/admin/user-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Quản lý danh sách khách hàng',
};

export default async function Page(): Promise<JSX.Element> {
	const userAdminService = new UserAdminService(apiServer);

	const initialUsers = await userAdminService.getCustomerList({pageNumber: 1, pageSize: 12});

	return <UserAdminContainer initialUsers={initialUsers} />;
}
