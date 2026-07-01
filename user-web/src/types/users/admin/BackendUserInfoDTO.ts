import { BackendUserDetailDto } from "./BackendUserDetailDto";
import { UserAddressBackendResponseDto } from "./UserAddressBackendResponseDto";

export interface BackendUserInfoDTO {
	id: string;
	fullName: string;
	email: string;
	phone?: string | null;
	addresses?: UserAddressBackendResponseDto[]; 
	dateOfBirth?: string | null;
	createAt?: string | null;
	updateAt?: string | null;
	userDetail?: BackendUserDetailDto | null;
	userExternalLogin?: string | null;
}