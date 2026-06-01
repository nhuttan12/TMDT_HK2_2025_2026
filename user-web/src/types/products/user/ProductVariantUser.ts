// Ghi nhận các phân loại vật lý tồn tại trong kho (SKU)
export interface ProductVariantUser {
	id: string;
	sku: string; // Mã lưu kho sản phẩm

	// Mảng index trỏ tới các option trong ProductTierVariation.
	// Ví dụ: tierIndex: [0, 1] nghĩa là kết hợp option 0 của Tier 1 ("Đen") và option 1 của Tier 2 ("Size M")
	tierIndex: number[];

	price: number; // Mức giá riêng của phân loại này
	stock: number; // Số lượng tồn kho (Nếu = 0 thì UI sẽ disable nút chọn)
	isActive: boolean; // Trạng thái chủ động tắt/bật từ admin
	image?: string; // Hình ảnh riêng biệt khi nhấn vào phân loại này (ghi đè ảnh gốc)
}
