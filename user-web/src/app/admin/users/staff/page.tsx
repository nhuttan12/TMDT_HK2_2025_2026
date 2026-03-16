import { JSX } from 'react';
import UserAdminClient from '@/app/admin/users/_components/user-admin-client';
import { UserListAdmin } from '@/types/users/admin/UserListAdmin';

const mockStaff: UserListAdmin[] = [
	{
		userID: 201,
		fullName: 'Lê Minh Hoàng',
		email: 'hoang.le@company.com',
		phone: '0988777666',
		avatar: 'https://i.pravatar.cc/150?img=21',
		role: 'STAFF',
		status: true,
		createdAt: '2024-01-15T11:45:00Z',
		updatedAt: '2024-02-05T09:10:00Z',
	},
	{
		userID: 202,
		fullName: 'Phạm Quỳnh Anh',
		email: 'quynhanh@company.com',
		phone: '0977555444',
		avatar: 'https://i.pravatar.cc/150?img=22',
		role: 'ADMIN',
		status: true,
		createdAt: '2024-01-20T13:00:00Z',
		updatedAt: '2024-02-06T16:30:00Z',
	},
	{
		userID: 203,
		fullName: 'Võ Quốc Huy',
		email: 'huy.vo@company.com',
		phone: '0966111222',
		avatar: 'https://i.pravatar.cc/150?img=23',
		role: 'STAFF',
		status: false,
		createdAt: '2024-01-28T14:10:00Z',
		updatedAt: '2024-02-08T09:40:00Z',
	},
];

export default function Index(): JSX.Element {
	return (
		<UserAdminClient
			users={mockStaff}
			mode={'staff'}
		/>
	);
}
