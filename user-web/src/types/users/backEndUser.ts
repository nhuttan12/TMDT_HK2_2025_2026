export interface BackEndUserDetail {
	lockTimeStart: string | null;
	lockTimeEnd: string | null;
	avatarUrl: string;
	addressId: string | number | null;
}

export interface BackEndUser {
	id: string;
	fullName: string;
	email: string;
	phone: string;
	addresses: addressesResponse[];
	dateOfBirth: string | null;
	createAt: string;
	updateAt: string;
	userDetail: BackEndUserDetail;
	userExternalLogin: string | null;
}

export interface UserProfileInfoRequset {
	fullname: string;
	phoneNumber: string;
	avatarUrl: string;
	addresses: addressesChangeRequest[];
}
export interface addressesResponse {
	id: string;
	addressUrl: string;
	isUsed: boolean;
}
export interface addressesChangeRequest {
	id?: string;
	addressUrl: string;
}