import { Review } from '@/types/products/user/Review';
import { ProductTierVariation } from './ProductTierVariation';
import { ProductVariantUser } from './ProductVariantUser';
import { ProductShop } from './ProductShop';

export interface ProductDetail {
	id: string;
	name: string;
	brand: string;
	description: string;
	rating: number;
	discount: number;

    // Tích hợp thông tin Shop vào chi tiết sản phẩm
	shop: ProductShop;

	// Xóa `price` đơn, thay bằng khoảng giá hiển thị ban đầu (VD: 150.000đ - 200.000đ)
	minPrice: number;
	maxPrice: number;

	// Xóa `image` đơn, thay bằng danh sách ảnh gốc của sản phẩm để làm Carousel
	images: string[];

	// Nhúng hệ thống phân loại vào
	tierVariations: ProductTierVariation[];
	variants: ProductVariantUser[];

	reviews: Review[];
}

