import { JSX } from 'react';
import UserAdminClient from '@/app/admin/users/_components/user-admin-client';
import { UserListAdmin } from '@/types/users/admin/UserListAdmin';
import { Metadata } from 'next';

const mockStaff: UserListAdmin[] = [
	{
		id: 201,
		fullName: 'Lê Minh Hoàng',
		email: 'hoang.le@company.com',
		phone: '0988777666',
		avatar: 'https://i.pravatar.cc/150?img=21',
		role: 'STAFF',
		status: true,
		createdAt: '2024-01-15T11:45:00Z',
	},
	{
		id: 202,
		fullName: 'Phạm Quỳnh Anh',
		email: 'quynhanh@company.com',
		phone: '0977555444',
		avatar: 'https://i.pravatar.cc/150?img=22',
		role: 'ADMIN',
		status: true,
		createdAt: '2024-01-20T13:00:00Z',
	},
	{
		id: 203,
		fullName: 'Võ Quốc Huy',
		email: 'huy.vo@company.com',
		phone: '0966111222',
		avatar: 'https://i.pravatar.cc/150?img=23',
		role: 'STAFF',
		status: false,
		createdAt: '2024-01-28T14:10:00Z',
	},
];

export const metadata: Metadata = {
	title: 'Quản lý nhân viên',
};

export default function Index(): JSX.Element {
	return (
		<UserAdminClient
			users={mockStaff}
			mode={'staffs'}
		/>
	);
}
