export interface ShopProfile {
	id: string;

	// 1. Thông tin cơ bản
	name: string;
	email: string;
	phone: string;
	description: string;
	address: string;

	// 2. Hình ảnh (THÊM VÀO ĐỂ ADMIN CÓ THỂ UPLOAD/EDIT)
	logoUrl: string;

	// 4. Thông tin thanh toán (Tuyệt đối không đưa sang ShopStorefront)
	bankName: string;
	accountName: string;
	accountNumber: string;
}
