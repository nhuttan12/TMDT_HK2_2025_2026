import { ProductVariantAdmin } from '@/types/products/admin/variant/ProductVariantAdmin';
import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductDetailRawUser } from '@/types/products/user/ProductDetailRawUser';
import { ProductTierVariation } from '@/types/products/user/ProductTierVariation';
import { ProductVariantUser } from '@/types/products/user/ProductVariantUser';
import {
	BackendPagedResult,
	BackendProductItem,
	BackendVariant,
	BackEndProductDetail,
} from '@/types/products/user/productBE';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ProductShop } from '@/types/products/user/ProductShop';

export const convertRawUserToProductDetail = (rawData: ProductDetailRawUser): ProductDetail => {
	// 1. Khởi tạo mảng chứa các tuỳ chọn của từng Tier
	const tierOptions: string[][] = [[], []];

	// 2. Bóc tách chuỗi Name của Admin Variant thành các Tiers
	rawData.productVariants.forEach((variant: ProductVariantAdmin): void => {
		// Giả định naming convention của admin là: "Option 1 - Option 2"
		const parts: string[] = variant.name.split(' - ').map((s: string) => s.trim());

		if (parts[0] && !tierOptions[0].includes(parts[0])) {
			tierOptions[0].push(parts[0]);
		}
		if (parts[1] && !tierOptions[1].includes(parts[1])) {
			tierOptions[1].push(parts[1]);
		}
	});

	// 3. Hình thành mảng TierVariations cho UI
	const tierVariations: ProductTierVariation[] = tierOptions
		.map(
			(options: string[], index: number): ProductTierVariation => ({
				name: index === 0 ? 'Kích thước' : 'Phân loại', // Hardcode hoặc có thể tự động lấy từ config
				options: options,
			}),
		)
		.filter((tier: ProductTierVariation): boolean => tier.options.length > 0);

	// 4. Map Admin Variant thành User Variant (Sử dụng mảng Index)
	const userVariants: ProductVariantUser[] = rawData.productVariants.map(
		(variant: ProductVariantAdmin): ProductVariantUser => {
			const parts: string[] = variant.name.split(' - ').map((s: string) => s.trim());

			const tierIndex: number[] = [
				tierOptions[0].indexOf(parts[0]),
				parts[1] ? tierOptions[1].indexOf(parts[1]) : -1,
			].filter((index: number) => index !== -1);

			return {
				id: variant.id,
				sku: variant.sku,
				tierIndex: tierIndex,
				price: variant.salePrice,
				stock: variant.quantity,
				isActive: variant.quantity > 0, // Cập nhật isActive dựa trên kho
				image: variant.image,
			};
		},
	);

	// 5. Tính toán Min/Max Price hiển thị
	const prices: number[] = userVariants.map((v: ProductVariantUser) => v.price);
	const minPrice: number = prices.length > 0 ? Math.min(...prices) : 0;
	const maxPrice: number = prices.length > 0 ? Math.max(...prices) : 0;

	// 6. Trả về cấu trúc ProductDetail chuẩn cho Hook và UI
	return {
		id: rawData.id + '',
		name: rawData.name,
		brand: rawData.supplierName,
		description: rawData.description,
		rating: rawData.rating,
		discount: rawData.discount ?? 0,

		shop: rawData.shop,

		minPrice,
		maxPrice,

		// Trích xuất mảng ảnh dạng chuỗi và sắp xếp theo order
		images: rawData.images.sort((a, b) => a.order - b.order).map((img) => img.imageUrl || ''),

		tierVariations: tierVariations,
		variants: userVariants,
		reviews: rawData.reviews,
	};
};

// ==========================================
// 1. HÀM MAP 1 SẢN PHẨM (BackendProductItem -> ProductUserCard)
// ==========================================
export function mapBackendProductToUserCard(backendItem: BackendProductItem): ProductUserCard {
	// 1. Trích xuất biến thể đầu tiên để ưu tiên lấy giá và hình ảnh
	// (Bảo vệ an toàn bằng cách kiểm tra mảng tồn tại và có phần tử)
	const firstVariant =
		backendItem.variants && backendItem.variants.length > 0 ? backendItem.variants[0] : null;

	// 2. Xử lý Giá bán: Ưu tiên giá sellPrice của biến thể, nếu không có thì lấy basePrice
	const currentPrice: number = firstVariant ? firstVariant.sellPrice : backendItem.basePrice;

	// 3. Xử lý Phần trăm giảm giá: Tính toán dựa trên chênh lệch giữa basePrice và currentPrice
	let calculatedDiscount: number = 0;
	if (backendItem.basePrice > currentPrice && backendItem.basePrice > 0) {
		calculatedDiscount = Math.round(
			((backendItem.basePrice - currentPrice) / backendItem.basePrice) * 100,
		);
	}

	// 4. Xử lý Hình ảnh hiển thị: Ưu tiên ảnh biến thể, fallback về ảnh đầu tiên của sản phẩm
	let displayImage: string = '';
	if (firstVariant && firstVariant.imageUrl) {
		displayImage = firstVariant.imageUrl;
	} else if (backendItem.imageUrls && backendItem.imageUrls.length > 0) {
		displayImage = backendItem.imageUrls[0];
	}

	// 5. Khởi tạo đối tượng ProductUserCard
	return {
		id: backendItem.id,
		name: backendItem.name,
		image: displayImage,
		price: currentPrice,
		discount: calculatedDiscount,
		rating: backendItem.rating || 0,
		isInWishlist: false, // Giá trị mặc định cho client
	};
}

// ==========================================
// 2. HÀM MAP TOÀN BỘ PHÂN TRANG (BackendPaginationData -> PaginationResponse)
// ==========================================
export function mapBackendPaginationToFrontend(
	backendData: BackendPagedResult<BackendProductItem>,
): PaginationResponse<ProductUserCard> {
	// Sử dụng arrow function bên trong phương thức của mảng, định nghĩa kiểu trả về tường minh
	const mappedItems: ProductUserCard[] = backendData.items.map(
		(item: BackendProductItem): ProductUserCard => mapBackendProductToUserCard(item),
	);

	return {
		data: mappedItems,
		// LƯU Ý: Chữ 'data' hay 'items' phụ thuộc vào định nghĩa PaginationResponse của bạn.
		// Nếu interface của bạn dùng 'items' thì đổi 'data' thành 'items'.

		meta: {
			currentPage: backendData.pageNumber,
			totalPages: backendData.totalPages,
			itemsPerPage: backendData.pageSize,
			totalItems: backendData.totalCount,
		},
	};
}

/**
 * Map dữ liệu Product Detail từ Backend Model sang Frontend Model.
 * Hàm này thường được gọi ngay sau khi nhận response từ service data layer.
 */
export function mapProductDetailBeToFe(data: BackEndProductDetail): ProductDetail {
	// 1. Tính toán khoảng giá từ danh sách biến thể (variants)
	const variantPrices: number[] = data.variants.map((v: BackendVariant): number => v.sellPrice);

	// Nếu có biến thể, lấy min/max. Nếu không, fallback về basePrice.
	const minPrice: number = variantPrices.length > 0 ? Math.min(...variantPrices) : data.basePrice;
	const maxPrice: number = variantPrices.length > 0 ? Math.max(...variantPrices) : data.basePrice;

	// 2. Tính toán % discount dựa trên variant đầu tiên (nếu có)
	let calculatedDiscount: number = 0;
	if (data.variants.length > 0) {
		const firstVariant: BackendVariant = data.variants[0];
		if (firstVariant.costPrice > firstVariant.sellPrice) {
			calculatedDiscount = Math.round(
				((firstVariant.costPrice - firstVariant.sellPrice) / firstVariant.costPrice) * 100,
			);
		}
	}

	// 3. Map thông tin Shop
	const shopMapped: ProductShop = {
		id: data.shop.id,
		shopName: data.shop.name,
		// Chuyển đổi tên key từ BE (shopLogos) sang FE (ví dụ là logo)
		shopSlug: data.shop.shopLogos,
	};

	// 4. Map danh sách Variants
	const variantsMapped: ProductVariantUser[] = data.variants.map(
		(variant: BackendVariant): ProductVariantUser => {
			return {
				id: variant.id,
				sku: variant.sku,
				// name: variant.name,
				// // Giả định ProductVariantUser sử dụng 'price' và 'originalPrice' thay vì 'sellPrice' / 'costPrice'
				price: variant.sellPrice,
				// originalPrice: variant.costPrice,
				// image: variant.imageUrl,
				// status: variant.status,
				tierIndex: [0,1],
				stock: 10,
				isActive: true,
				image: variant.imageUrl,

			};
		},
	);

	// 5. Trả về cấu trúc ProductDetail của Frontend
	return {
		id: data.id,
		name: data.name,
		brand: data.shop.name, // Fallback tạm thời: BE không trả brand, dùng tên shop làm brand
		description: data.description,
		rating: data.rating,
		discount: calculatedDiscount,
		shop: shopMapped,
		minPrice: minPrice,
		maxPrice: maxPrice,
		images: data.imageUrls, // Đổi imageUrls -> images
		tierVariations: [], // Mock rỗng do BE JSON chưa support mảng này
		variants: variantsMapped,
		reviews: [], // Mock rỗng do BE JSON chưa support reviews
	};
}