// Ghi nhận các nhóm phân loại (Ví dụ: Màu sắc, Kích cỡ)
export interface ProductTierVariation {
	name: string; // Tên nhóm (vd: "Màu sắc", "Dung lượng")
	options: string[]; // Các lựa chọn (vd: ["Đen", "Trắng", "Đỏ"])
	// Shopee thường cho phép gán một mảng hình ảnh tương ứng với từng option ở Tier đầu tiên
	images?: string[];
}
