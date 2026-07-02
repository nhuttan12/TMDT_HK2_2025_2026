import {
	addressesChangeRequest,
	addressesResponse,
	BackEndUser,
	UserProfileInfoRequset,
} from '@/types/users/backEndUser';
import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';

// Định nghĩa giá trị mặc định cho ô địa chỉ trống để UI không bị lỗi (Uncontrolled input)
const defaultAddress: addressesResponse = {
	id: '',
	addressUrl: '',
	isUsed: false,
};
export const mapBackEndUserToProfileInfo = (user: BackEndUser): UserProfileInfo => {
	// 1. Lọc bỏ các địa chỉ rác dạng "string" từ hệ thống nếu có
	const validAddresses = (user.addresses || []).filter(
		(addr) => addr && addr.addressUrl && addr.addressUrl.toLowerCase() !== 'string',
	);

	// 2. Map thành cấu trúc phẳng của Frontend
	return {
		// Nếu interface UserProfileInfo của bạn bắt buộc là number, hãy dùng: Number(user.id)
		// Nhưng khuyến khích bạn đổi kiểu id trong UserProfileInfo thành string vì backend đang trả về chuỗi UUID.
		id: user.id,
		fullName: user.fullName ?? '',
		email: user.email ?? '',
		phone: user.phone ?? '',

		// Phân phối mảng vào 3 ô địa chỉ độc lập
		address1: validAddresses[0] ? { ...validAddresses[0] } : { ...defaultAddress },
		address2: validAddresses[1] ? { ...validAddresses[1] } : { ...defaultAddress },
		address3: validAddresses[2] ? { ...validAddresses[2] } : { ...defaultAddress },

		// Trích xuất avatarUrl từ object lồng userDetail
		avatarUrl: user.userDetail?.avatarUrl ?? '',
	};
};
export const mapUserProfileToRequest = (profile: UserProfileInfo): UserProfileInfoRequset => {
	// 1. Gom các địa chỉ lại và lọc bỏ các giá trị null/undefined (nếu có)
	const rawAddresses = [profile.address1, profile.address2, profile.address3].filter(Boolean);

	// 2. Map mảng các object `C` sang cấu trúc `addressesChangeRequest`
	// const mappedAddresses = rawAddresses.map((address) => {
	// 	return {
	// 		// Lấy trực tiếp id từ object address cũ sang
	// 		id: address.id ?? '',

	// 		// Lấy trực tiếp chuỗi addressUrl từ object address cũ sang
	// 		addressUrl: address.addressUrl ?? '',
	// 	};
	// });
	const mappedAddresses = [
		{
			addressUrl: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
		},
	] as addressesChangeRequest[];

	return {
		fullname: profile.fullName,
		phoneNumber: profile.phone,
		avatarUrl: profile.avatarUrl ?? '',
		addresses: mappedAddresses,
	};
};
