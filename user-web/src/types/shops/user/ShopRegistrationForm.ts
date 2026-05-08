import { ShopProfile } from "../admin/ShopProfile";

/**
 * Sử dụng Pick: Chỉ "nhặt" ra những trường cần thiết cho lúc đăng ký từ ShopProfile.
 * Điều này đảm bảo tính ĐỒNG NHẤT 100%. Nếu ShopProfile đổi 'name' thành 'shopName',
 * hệ thống sẽ báo lỗi ngay tại đây để bạn biết đường sửa.
 */
export interface ShopRegistrationForm extends Pick<
	ShopProfile,
	| 'name'
	| 'email'
	| 'phone'
	| 'description'
	| 'address'
	| 'facebookUrl'
	| 'bankName'
	| 'accountName'
	| 'accountNumber'
> {
	id?: number;

	// Bổ sung các trường CHỈ CÓ ở Form Đăng ký (không lưu vào Profile)
	termsAccepted: boolean;

	// Ở form thì logo thường là 1 đối tượng File (người dùng upload từ máy tính)
	// chứ không phải là URL string như lúc lấy từ DB ra.
	// Nếu bạn dùng URL (sau khi upload thẳng lên S3/Cloudinary rồi mới submit form) thì để string.
	logoFile?: File | string;
}
