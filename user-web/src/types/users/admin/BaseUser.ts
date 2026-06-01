import { UserRole } from '@/types/users/UserRole';

export interface BaseUserAdmin {
	id: string;
	fullName: string;
	email: string;
	phone: string;
	avatar: string;
	role: UserRole;
	status: boolean;
}
