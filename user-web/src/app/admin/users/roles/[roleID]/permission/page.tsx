import { JSX } from 'react';
import { RolePermission } from '@/types/users/admin/RolePermission';
import RolePermissionForm from '@/app/admin/users/roles/[id]/permission/_components/role-permission-form';
import { Metadata } from 'next';

const rolePermissions: RolePermission[] = [
	{
		id: 1,
		permission: 'Thêm sản phẩm',
		code: 'product.add',
		isActive: true,
	},
	{
		id: 2,
		permission: 'Sửa sản phẩm',
		code: 'product.update',
		isActive: true,
	},
	{
		id: 3,
		permission: 'Xóa sản phẩm',
		code: 'product.remove',
		isActive: false,
	},
	{
		id: 4,
		permission: 'Xem danh sách sản phẩm',
		code: 'product.view',
		isActive: true,
	},
	{
		id: 5,
		permission: 'Quản lý đơn hàng',
		code: 'order.view',
		isActive: false,
	},
];

export const metadata: Metadata = {
	title: 'Quản lý quyền truy cập của nhân viên',
};


export default function Page(): JSX.Element {
	return (
		<RolePermissionForm
			permissions={rolePermissions}
			formType={'view'}
		/>
	);
}
