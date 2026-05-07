export interface ShopProfile {
	id: number; // Thêm ID để Admin gọi API cập nhật (PUT/PATCH) đúng shop của mình

	// 1. Thông tin cơ bản
	name: string;
	email: string;
	phone: string;
	description: string;
	address: string;
	facebookUrl: string;

	// 2. Hình ảnh (THÊM VÀO ĐỂ ADMIN CÓ THỂ UPLOAD/EDIT)
	logoUrl: string;

	// 3. Cấu hình SEO
	seoTitle: string;
	metaDescription: string;

	// 4. Thông tin thanh toán (Tuyệt đối không đưa sang ShopStorefront)
	bankName: string;
	accountName: string;
	accountNumber: string;
}
