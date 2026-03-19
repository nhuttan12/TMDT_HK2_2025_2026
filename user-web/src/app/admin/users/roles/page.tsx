import { JSX } from 'react';
import RoleClient from '@/app/admin/users/roles/_components/role-client';
import { Role } from '@/types/users/admin/Role';
import { Metadata } from 'next';

const roles: Role[] = [
	{
		id: 1,
		name: 'Admin',
		description: 'Quyền cao nhất hệ thống',
		isActive: true,
	},
	{
		id: 2,
		name: 'Manager',
		description: 'Quản lý sản phẩm và đơn hàng',
		isActive: true,
	},
	{
		id: 3,
		name: 'Staff',
		description: 'Nhân viên bán hàng',
		isActive: true,
	},
	{
		id: 4,
		name: 'Support',
		description: 'Hỗ trợ khách hàng',
		isActive: false,
	},
];

export const metadata: Metadata = {
	title: 'Quản lý thông tin chức vụ',
};

export default function Page(): JSX.Element {
	return <RoleClient roles={roles} />;
}
