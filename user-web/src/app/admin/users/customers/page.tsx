import { JSX } from 'react';
import UserAdminClient from '@/app/admin/users/_components/user-admin-client';
import { UserListAdmin } from '@/types/users/admin/UserListAdmin';
import { Metadata } from 'next';

const mockCustomers: UserListAdmin[] = [
	{
		id: 101,
		fullName: 'Nguyễn Văn An',
		email: 'an.nguyen@gmail.com',
		phone: '0909123456',
		avatar: 'https://i.pravatar.cc/150?img=11',
		role: 'CUSTOMER',
		status: true,
		createdAt: '2024-01-05T08:30:00Z',
	},
	{
		id: 102,
		fullName: 'Trần Thị Bình',
		email: 'binh.tran@gmail.com',
		phone: '0911222333',
		avatar: 'https://i.pravatar.cc/150?img=12',
		role: 'CUSTOMER',
		status: false,
		createdAt: '2024-01-10T09:00:00Z',
	},
	{
		id: 103,
		fullName: 'Đỗ Thanh Tùng',
		email: 'tung.do@gmail.com',
		phone: '0933444555',
		avatar: 'https://i.pravatar.cc/150?img=13',
		role: 'CUSTOMER',
		status: true,
		createdAt: '2024-01-25T07:20:00Z',
	},
];

export const metadata: Metadata = {
	title: 'Quản lý khách hàng',
};

export default function Index(): JSX.Element {
	return (
		<UserAdminClient
			users={mockCustomers}
			mode={'customers'}
		/>
	);
}
