import { JSX } from 'react';
import { Metadata } from 'next';
import UserAdminContainer from '@/app/admin/users/_components/user-admin-container';
import { getCustomerList } from '@/services/users/admin/user-service';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';

export const metadata: Metadata = {
	title: 'Quản lý danh sách khách hàng',
};

export default async function Page(): Promise<JSX.Element> {
	const initialUsers: CustomerListAdmin[] = await getCustomerList();

	return <UserAdminContainer initialUsers={initialUsers} />;
}
