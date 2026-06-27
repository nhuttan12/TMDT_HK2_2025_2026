import { BackendPagedResult, BackendProductItem } from '@/types/products/user/productBE';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

export function mapBackendToFrontendProduct(beProduct: BackendProductItem): ProductUserCard {
	// 1. Lấy thông tin Variant đầu tiên (nếu có) để lấy giá bán thực tế
	const firstVariant = beProduct.variants.length > 0 ? beProduct.variants[0] : null;

	// 2. Xác định giá bán: Lấy giá sellPrice của variant, nếu không có thì lấy basePrice
	const currentPrice: number = firstVariant ? firstVariant.sellPrice : beProduct.basePrice;

	// 3. Tính toán phần trăm giảm giá (Discount)
	let calculatedDiscount: number = 0;
	if (beProduct.basePrice > 0 && currentPrice < beProduct.basePrice) {
		// Ví dụ: base=899000, sell=629300 => (899000 - 629300)/899000 * 100 = 30%
		calculatedDiscount = Math.round(
			((beProduct.basePrice - currentPrice) / beProduct.basePrice) * 100,
		);
	}

	// 4. Lấy ảnh đại diện: Ưu tiên ảnh đầu tiên trong mảng imageUrls
	const mainImage: string =
		beProduct.imageUrls.length > 0 ? beProduct.imageUrls[0] : firstVariant?.imageUrl || '';

	return {
		id: beProduct.id,
		name: beProduct.name,
		image: mainImage,
		price: currentPrice,
		discount: calculatedDiscount,
		rating: beProduct.rating,
		isInWishlist: false, // FIXME: Backend chưa cung cấp trường này, gán mặc định
	};
}

/**
 * Biến đổi cục Wrapper Phân trang
 */
export function mapBackendToFrontendPagination(
	beData: BackendPagedResult<BackendProductItem>,
): PaginationResponse<ProductUserCard> {
	return {
		data: beData.items.map(
			(item: BackendProductItem): ProductUserCard => mapBackendToFrontendProduct(item),
		),
		meta: {
			currentPage: beData.pageNumber, // BE dùng pageNumber, FE dùng currentPage
			totalPages: beData.totalPages,
			itemsPerPage: beData.pageSize,
			totalItems: beData.totalCount,
		},
	};
}
