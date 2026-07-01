import { BackendUserInfoDTO } from '@/types/users/admin/BackendUserInfoDTO';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';

export const mapUserInfoToCustomerList = (backendUser: BackendUserInfoDTO): CustomerListAdmin => {
	return {
		id: backendUser.id,
		// Map fullName và email trực tiếp
		fullName: backendUser.fullName,
		email: backendUser.email,

		// Fallback chuỗi rỗng nếu phone bị null từ backend
		phone: backendUser.phone || '',

		// Trích xuất AvatarUrl từ userDetail, fallback về ảnh mặc định nếu không có
		avatar: backendUser.userDetail?.avatarUrl || 'https://via.placeholder.com/150',

		// Map từ CreateAt (Backend) sang createdAt (Frontend), fallback nếu null
		createdAt: backendUser.createAt || new Date().toISOString(),

		// Trích xuất lockTimeStart và lockTimeEnd từ userDetail, fallback chuỗi rỗng nếu không có
		lockTimeStart: backendUser.userDetail?.lockTimeStart || '',
		lockTimeEnd: backendUser.userDetail?.lockTimeEnd || '',
	};
};
