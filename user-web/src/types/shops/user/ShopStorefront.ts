export interface ShopStorefront {
	id: string; // Dùng để gọi API lấy sản phẩm
	slug: string; // Dùng cho định tuyến URL (VD: /shop/ten-shop)

	// Thông tin hiển thị công khai (Lấy từ ShopProfile của Admin)
	name: string;
	description: string;
	address: string;
	phone?: string;
	email?: string;
	facebookUrl?: string;

	// Hình ảnh hiển thị (Bắt buộc phải có cho UI)
	logoUrl: string;
	coverUrl: string;

	// Mảng chứa các URL ảnh banner trượt của Shop
	banners: string[];

	// Chỉ số tương tác (Riêng của Storefront, Admin Profile không lưu cái này trực tiếp)
	rating: number; // Đánh giá trung bình (VD: 4.8)
	followerCount: number; // Số lượng người theo dõi

	// Dùng cho Server Component để render meta tags
	seoTitle: string;
	metaDescription: string;
}
