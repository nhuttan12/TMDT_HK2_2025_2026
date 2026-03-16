import { JSX } from 'react';
import RoleClient from '@/app/admin/users/roles/_components/role-client';
import { Role } from '@/types/users/admin/Role';

const roles: Role[] = [
	{
		roleID: 1,
		name: 'Admin',
		description: 'Quyền cao nhất hệ thống',
		isActive: true,
	},
	{
		roleID: 2,
		name: 'Manager',
		description: 'Quản lý sản phẩm và đơn hàng',
		isActive: true,
	},
	{
		roleID: 3,
		name: 'Staff',
		description: 'Nhân viên bán hàng',
		isActive: true,
	},
	{
		roleID: 4,
		name: 'Support',
		description: 'Hỗ trợ khách hàng',
		isActive: false,
	},
];

export default function Page(): JSX.Element {
	return <RoleClient roles={roles} />;
}
