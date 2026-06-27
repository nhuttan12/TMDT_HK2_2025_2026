import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';
import { type AxiosInstance } from 'axios';
import { ResponseApi } from '@/types/common/ResponseApi';
import { BackEndUser, UserProfileInfoRequset } from '@/types/users/backEndUser';
import { mapToUserProfileInfo, mapUserProfileToRequest } from '@/utils/users/UserAdapter';

/**
 * Lấy thông tin hồ sơ người dùng dựa trên ID
 */
export async function getUserProfileCraw(userId: number): Promise<UserProfileInfo> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: userId,
				fullName: 'Nguyễn Văn A',
				email: 'nguyenvana@example.com',
				phone: '0901234567',
				address1: '123 Đường Số 1, Quận 1, TP.HCM',
				address2: 'Tòa nhà Landmark 81, Bình Thạnh',
				address3: '',
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
			return mapToUserProfileInfo(response.data.data);
		} catch {
			return getUserProfileCraw(userId);
		}
	}
	async updateProfile(userprofile: UserProfileInfo): Promise<UserProfileInfo> {
		try {
			const userProfileRequest : UserProfileInfoRequset = mapUserProfileToRequest(userprofile);
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