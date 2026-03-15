import { BaseUserAdmin } from '@/types/users/admin/BaseUser';

export interface UserDetailInfoAdmin extends BaseUserAdmin {
	createdAt: string;
	updatedAt: string;
}
