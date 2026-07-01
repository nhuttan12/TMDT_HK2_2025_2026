import { BaseUserAdmin } from '@/types/users/admin/BaseUser';

export interface CustomerListAdmin extends BaseUserAdmin {
	createdAt: string;
    lockTimeStart: string;
    lockTimeEnd: string;
}
