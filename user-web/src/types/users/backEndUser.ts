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
	address: string[];
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
	addresses: string[];
}