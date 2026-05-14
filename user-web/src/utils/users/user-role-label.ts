import { UserRole } from '@/types/users/UserRole';

const USER_ROLE_LABEL: Record<UserRole, string> = {
	customer: 'Khách hàng',
	'shop-owner': 'Chủ cửa hàng',
	admin: 'Quản trị viên',
};

export function getUserRoleLabel(role: UserRole): string {
	return USER_ROLE_LABEL[role];
}
