import { addressesResponse } from '@/types/users/backEndUser';

export interface UserProfileInfo {
	id: number | string;
	fullName: string;
	email: string;
	phone: string;
	address1: addressesResponse;
	address2: addressesResponse;
	address3: addressesResponse;
	avatarUrl?: string;
}
