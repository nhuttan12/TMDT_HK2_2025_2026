import UserAdminContainer from '@/app/admin/users/_components/user-admin-container';
import { getCustomerList } from '@/services/users/admin/user-service';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Quản lý danh sách khách hàng',
};

export default async function Page(): Promise<JSX.Element> {
	const initialUsers = await getCustomerList();

	return <UserAdminContainer initialUsers={initialUsers} />;
}
