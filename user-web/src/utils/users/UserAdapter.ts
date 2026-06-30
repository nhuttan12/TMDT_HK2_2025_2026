import { BackEndUser, UserProfileInfoRequset } from '@/types/users/backEndUser';
import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';

export const mapToUserProfileInfo = (user: BackEndUser): UserProfileInfo => {
	return {
		// Ép kiểu ép buộc do sai lệch thiết kế, khuyên dùng: id: string trong UserProfileInfo
		id: user.id as unknown as number,

		fullName: user.fullName,
		email: user.email,
		phone: user.phone,

		// Trích xuất an toàn từ mảng address, nếu không có phần tử thì gán chuỗi rỗng
		address1: user.address?.[0] || '',
		address2: user.address?.[1] || '',
		address3: user.address?.[2] || '',

		// Lấy avatarUrl từ object lồng nhau userDetail (sử dụng optional chaining ?.)
		avatarUrl: user.userDetail?.avatarUrl || '',
	};
};

export const mapUserProfileToRequest = (profile: UserProfileInfo): UserProfileInfoRequset => {
	// Gom các địa chỉ lại và loại bỏ những giá trị rỗng (falsy)
	const validAddresses = [profile.address1, profile.address2, profile.address3].filter(Boolean);

	return {
		fullname: profile.fullName,
		phoneNumber: profile.phone,
		avatarUrl: profile.avatarUrl ?? '', // Sử dụng chuỗi rỗng nếu avatarUrl bị undefined
		addresses: validAddresses,
	};
};