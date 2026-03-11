import { JSX } from 'react';
import UserAdminTable from '@/app/admin/users/_components/user-admin-table';
import { UserListAdmin } from '@/types/users/admin/UserListAdmin';

const mockCustomers: UserListAdmin[] = [
	{
		userID: 101,
		fullName: 'Nguyễn Văn An',
		email: 'an.nguyen@gmail.com',
		phone: '0909123456',
		avatar: 'https://i.pravatar.cc/150?img=11',
		role: 'CUSTOMER',
		status: true,
		createdAt: '2024-01-05T08:30:00Z',
	},
	{
		userID: 102,
		fullName: 'Trần Thị Bình',
		email: 'binh.tran@gmail.com',
		phone: '0911222333',
		avatar: 'https://i.pravatar.cc/150?img=12',
		role: 'CUSTOMER',
		status: false,
		createdAt: '2024-01-10T09:00:00Z',
	},
	{
		userID: 103,
		fullName: 'Đỗ Thanh Tùng',
		email: 'tung.do@gmail.com',
		phone: '0933444555',
		avatar: 'https://i.pravatar.cc/150?img=13',
		role: 'CUSTOMER',
		status: true,
		createdAt: '2024-01-25T07:20:00Z',
	},
];

export default function Index(): JSX.Element {
	return (
		<UserAdminTable
			users={mockCustomers}
			mode={'customer'}
		/>
	);
}
