export type UserRole = 'CUSTOMER' | 'STAFF' | 'ADMIN';

const USER_ROLE_LABEL: Record<UserRole, string> = {
	CUSTOMER: 'Khách hàng',
	STAFF: 'Nhân viên',
	ADMIN: 'Quản trị viên',
};

export function getUserRoleLabel(role: UserRole): string {
	return USER_ROLE_LABEL[role];
}