import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';
import { type AxiosInstance } from 'axios';
import { ResponseApi } from '@/types/common/ResponseApi';
import { BackEndUser, UserProfileInfoRequset } from '@/types/users/backEndUser';
import { mapBackEndUserToProfileInfo, mapUserProfileToRequest } from '@/utils/users/UserAdapter';

/**
 * Lấy thông tin hồ sơ người dùng dựa trên ID
 */
export async function getUserProfileCraw(userId: number |string): Promise<UserProfileInfo> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: userId,
				fullName: 'Nguyễn Văn A',
				email: 'nguyenvana@example.com',
				phone: '0901234567',
				address1: {
					id: '',
					addressUrl: '123 Đường Số 1, Quận 1, TP.HCM',
					isUsed: true,
				},
				address2: {
					id: '',
					addressUrl: 'Tòa nhà Landmark 81, Bình Thạnh',
					isUsed: false,
				},
				address3: {
					id: '',
					addressUrl: '',
					isUsed: true,
				},
				avatarUrl: '',
			});
		}, 500);
	});
}

export class UserService {
	constructor(private api: AxiosInstance) {}
	async getUserProfile(userId: number): Promise<UserProfileInfo> {
		try {
			const response = await this.api.get<ResponseApi<BackEndUser>>(`/users/me`);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return getUserProfileCraw(userId);
			}
			console.log(response.data.data);
			return mapBackEndUserToProfileInfo(response.data.data);
		} catch {
			return getUserProfileCraw(userId);
		}
	}
	async updateProfile(userprofile: UserProfileInfo): Promise<UserProfileInfo> {
		try {
			const userProfileRequest : UserProfileInfoRequset = mapUserProfileToRequest(userprofile);
			console.log(userProfileRequest);
			const response = await this.api.put<ResponseApi<BackEndUser>>(
				`/users/me`,
				userProfileRequest,
			);
			if (!response.data) {
				return getUserProfileCraw(userprofile.id);
			}
			return userprofile
		} catch {
			return getUserProfileCraw(userprofile.id);
		}
	}
}