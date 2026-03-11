import { JSX } from 'react';
import RolePermissionForm from '@/app/admin/users/roles/[id]/permission/_components/role-permission-form';
import { RolePermission } from '@/types/users/admin/RolePermission';

const rolePermissions: RolePermission[] = [
	{
		permissionID: 1,
		permission: 'Thêm sản phẩm',
		code: 'product.add',
		isActive: true,
	},
	{
		permissionID: 2,
		permission: 'Sửa sản phẩm',
		code: 'product.update',
		isActive: true,
	},
	{
		permissionID: 3,
		permission: 'Xóa sản phẩm',
		code: 'product.remove',
		isActive: false,
	},
	{
		permissionID: 4,
		permission: 'Xem danh sách sản phẩm',
		code: 'product.view',
		isActive: true,
	},
	{
		permissionID: 5,
		permission: 'Quản lý đơn hàng',
		code: 'order.view',
		isActive: false,
	},
];

export default function Page(): JSX.Element {
	return <RolePermissionForm permissions={rolePermissions} formType={'update'} />;
}