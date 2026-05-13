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
				banners: [
					'https://cdn.hstatic.net/200000968796/file/banner_copy_d44c5befb50744ec92b85e23a8c3392a.png',
					'https://file.hstatic.net/200000968796/file/demo2_90cd97089ecc451ca20779c42bdaa1c3.png',
					'https://file.hstatic.net/200000968796/file/demo3_6ba90a06a7a6492a9407221c9ade0290.png',
				],
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
						id: 7,
						name: 'Bể Terrarium Trụ Tròn Size M (Kèm Đèn)',
						image: 'https://cdn.hstatic.net/products/200000968796/cao_7_acd749099ceb4f6aa01a3fe1aca37890.png',
						price: 550000,
						isInWishlist: true,
						rating: 4.9,
						discount: 10,
					},
					{
						id: 8,
						name: 'Cây Cẩm Nhung Fittonia Đỏ Chậu Nhỏ',
						image: 'https://product.hstatic.net/200000968796/product/tf-015__1__9a93238e4b604c918e65941527286733.png',
						price: 35000,
						isInWishlist: false,
						rating: 4.7,
						discount: 0,
					},
					{
						id: 9,
						name: 'Combo Rêu Nhung, Dương Xỉ, Đất Nền Tự Setup',
						image: 'https://product.hstatic.net/200000968796/product/tf-015__2__297a7cdae0e7481c8a82971aad9a7750.png',
						price: 150000,
						isInWishlist: false,
						rating: 4.8,
						discount: 5,
					},
					{
						id: 10,
						name: 'Bình Xịt Phun Sương Mini Bằng Đồng Cao Cấp',
						image: 'https://product.hstatic.net/200000968796/product/tf-015__6__7f6dcd819fcc4c99b2beed47477926e1.png',
						price: 85000,
						isInWishlist: false,
						rating: 4.6,
						discount: 0,
					},
					{
						id: 11,
						name: 'Đá Trầm Tích Vụn Rải Đường Mòn Terrarium (500g)',
						image: 'https://product.hstatic.net/200000968796/product/tf-015__3__eb5511ad6edf4a279b55a95220ec179d.png',
						price: 25000,
						isInWishlist: true,
						rating: 4.5,
						discount: 0,
					},
					{
						id: 12,
						name: 'Paludarium - Bể Thủy Sinh Bán Cạn Độc Bản',
						image: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?q=80&w=800',
						price: 1250000,
						isInWishlist: false,
						rating: 5.0,
						discount: 15,
					},
					{
						id: 13,
						name: 'Lọc Thác Bể Thủy Sinh Mini SoBo',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 110000,
						isInWishlist: true,
						rating: 4.4,
						discount: 0,
					},
					{
						id: 14,
						name: 'Đèn Chiếu Điểm Spotlight Hồ Thủy Sinh Rọi Cây',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___4__8de9057e82334ecb84a81d2f45452153.png',
						price: 220000,
						isInWishlist: false,
						rating: 4.8,
						discount: 10,
					},
					{
						id: 15,
						name: 'Bể Kính Đa Giác Geometric Khung Đồng Vàng',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 320000,
						isInWishlist: false,
						rating: 4.9,
						discount: 15,
					},
					{
						id: 16,
						name: 'Rêu Sừng Hươu Xanh Mướt (Hộp 15x15cm)',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 55000,
						isInWishlist: true,
						rating: 4.8,
						discount: 0,
					},
					{
						id: 17,
						name: 'Tiểu Cảnh Bonsai Mini Gỗ Lũa Tự Nhiên',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 850000,
						isInWishlist: false,
						rating: 5.0,
						discount: 20,
					},
					{
						id: 18,
						name: 'Combo Cây Cắt Cắm Thủy Sinh Dễ Trồng',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 120000,
						isInWishlist: false,
						rating: 4.6,
						discount: 0,
					},
					{
						id: 19,
						name: 'Bình Cầu Thủy Tinh Trồng Sen Đá Trong Suốt',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 185000,
						isInWishlist: true,
						rating: 4.7,
						discount: 10,
					},
					{
						id: 20,
						name: 'Bộ Kéo Cắt Nhíp Gắp Aquascape Chuyên Dụng',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 250000,
						isInWishlist: false,
						rating: 4.9,
						discount: 5,
					},
					{
						id: 21,
						name: 'Bóng Đèn LED Quang Phổ Trồng Cây Trong Nhà',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 190000,
						isInWishlist: true,
						rating: 4.8,
						discount: 0,
					},
					{
						id: 22,
						name: 'Đất Nền Trộn Sẵn Phù Hợp Mọi Loại Terrarium',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 65000,
						isInWishlist: false,
						rating: 4.5,
						discount: 0,
					},
					{
						id: 23,
						name: 'Cây Dương Xỉ Lá Me Rủ Xanh Tốt',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 45000,
						isInWishlist: false,
						rating: 4.7,
						discount: 10,
					},
					{
						id: 24,
						name: 'Bình Lọ Thủy Tinh Nắp Bần Làm Terrarium Kín',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 155000,
						isInWishlist: true,
						rating: 4.9,
						discount: 0,
					},
					{
						id: 25,
						name: 'Sỏi Cuội Trắng Tự Nhiên Trang Trí (Túi 1kg)',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 30000,
						isInWishlist: false,
						rating: 4.6,
						discount: 0,
					},
					{
						id: 26,
						name: 'Combo 3 Chậu Sen Đá Size Mini Dễ Thương',
						image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
						price: 99000,
						isInWishlist: false,
						rating: 4.8,
						discount: 12,
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
					couponType: 'sale',
					description: 'Áp dụng cho đơn hàng từ 500K. Số lượng có hạn.',
					expiredAt: '2026-06-30T23:59:59Z',
					code: 'TECH100',
				},
				{
					id: 2,
					title: 'Miễn phí vận chuyển',
					couponType: 'ship',
					description: 'Giảm tối đa 30K phí vận chuyển cho đơn từ 150K.',
					expiredAt: '2026-05-15T23:59:59Z',
					code: 'FREESHIP30',
				},
			]);
		}, 600);
	});
};
