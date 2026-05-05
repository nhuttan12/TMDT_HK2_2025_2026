import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ShopPublicFilter } from '@/types/shops/user/ShopPublicFilter';
import { ShopStorefront } from '@/types/shops/user/ShopStorefront';

export const getShopPublicInfoById = async (shopId: number): Promise<ShopStorefront> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!shopId) return reject(new Error('Shop ID is required'));

			resolve({
				id: shopId,
				name: 'Terrarium - Rừng Cây Trong Bể Kính',
				slug: 'terrarium-rung-cay-trong-be-kinh',
				description: 'Chuyên cung cấp các mẫu bể kính tiểu cảnh nghệ thuật.',
				address: '123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh',
				phone: '1900 1234',
				email: 'contact@terrarium.vn',
				facebookUrl: 'https://facebook.com/techstorevn',
				logoUrl:
					'https://www.shutterstock.com/image-vector/logo-terrarium-succulents-mini-garden-260nw-694576459.jpg',
				coverUrl:
					'https://terrariumvibe.com/wp-content/uploads/2024/03/Tieu-canh-Terrarium-4.jpg',
				rating: 4.9,
				followerCount: 15420,
				seoTitle: 'Terrarium - Rừng Cây Trong Bể Kính',
				metaDescription:
					'Shop bán Terrarium uy tín hàng đầu Việt Nam. Chuyên cung cấp các mẫu bể kính tiểu cảnh nghệ thuật.',
			});
		}, 800);
	});
};

/**
 * Lấy danh sách sản phẩm của cửa hàng
 */
export const getShopPublicProducts = async (
	shopId: number,
	filter: ShopPublicFilter,
): Promise<PaginationResponse<ProductUserCard>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(`Fetching products for shop ${shopId} with filter:`, filter);
			resolve({
				data: [
					{
						id: 101,
						name: 'Terrarium Hidden Rock Refuge - Bể Đa Giác - Quà Tặng Cao Cấp',
						image: 'https://cdn.hstatic.net/products/200000968796/ard_1_d1d032f2014749208779e61dd6644c97.png',
						price: 1500000,
						discount: 10, // Giảm 10%
						rating: 4.8,
						isInWishlist: false,
					},
					{
						id: 102,
						name: 'Terrarium The Forgotten Forest Gate - Bể Trứng Đa Giác - Quà Tặng Cao Cấp',
						image: 'https://cdn.hstatic.net/products/200000968796/co_tich_5feadef9bb6c4700a360b23aaae13e85.png',
						price: 850000,
						discount: 0,
						rating: 4.5,
						isInWishlist: true,
					},
					{
						id: 103,
						name: 'Zen Terrarium Sanctum of Silent Awakening - Bể Đa Giác - Quà Tặng Cao Cấp',
						image: 'https://cdn.hstatic.net/products/200000968796/p4_4de79927f8ed486fb7b9c1527101c423.png',
						price: 2100000,
						discount: 15,
						rating: 4.9,
						isInWishlist: false,
					},
					{
						id: 104,
						name: 'Terrarium Sylva Nocturne - Bể Hộp Chữ Nhật - Decor Bàn Học',
						image: 'https://cdn.hstatic.net/products/200000968796/nho_1_5566cc4cedfa43e29069b4c90646f4d1.png',
						price: 150000,
						discount: 5,
						rating: 4.7,
						isInWishlist: false,
					},
				],
				meta: {
					totalItems: 4,
					totalPages: 1,
					currentPage: filter.page,
					itemsPerPage: filter.limit,
				},
			});
		}, 1000);
	});
};

/**
 * Lấy danh sách coupon của cửa hàng (Khách hàng có thể lưu)
 */
export const getShopPublicCoupons = async (shopId: number): Promise<UserCoupon[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					title: 'Giảm 100K',
					couponType: 'Sale',
					description: 'Áp dụng cho đơn hàng từ 500K. Số lượng có hạn.',
					expiredAt: '2026-06-30T23:59:59Z',
					code: 'TECH100',
				},
				{
					id: 2,
					title: 'Miễn phí vận chuyển',
					couponType: 'Ship',
					description: 'Giảm tối đa 30K phí vận chuyển cho đơn từ 150K.',
					expiredAt: '2026-05-15T23:59:59Z',
					code: 'FREESHIP30',
				},
			]);
		}, 600);
	});
};
