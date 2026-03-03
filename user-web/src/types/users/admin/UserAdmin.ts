import { UserRole } from '../UserRole';

export interface UserAdmin {
	userID: number;
	fullName: string;
	email: string;
	phone: string;
	avatar: string;
	role: UserRole;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}