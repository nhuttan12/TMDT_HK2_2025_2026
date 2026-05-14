import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

export const getProductsFromWishlist = async (
	page: number,
): Promise<PaginationResponse<ProductUserCard>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				data: [
					{
						id: 101,
						name: 'Bể Kính Đa Giác Basic 20x20',
						image: 'https://caydeban.com.vn/image/cache/catalog/products/Terrariums/MS01/Terrarium-MS01_6634-600x600.JPG',
						price: 350000,
						discount: 22,
						rating: 4.9,
						isInWishlist: false,
					},
					{
						id: 102,
						name: 'Rêu Đầu Rìu (Hộp Nhỏ)',
						image: 'https://bizweb.dktcdn.net/thumb/grande/100/519/158/files/reu-mini-taiwan-thuy-sinh.jpg?v=1718441622291',
						price: 65000,
						discount: 0,
						rating: 4.8,
						isInWishlist: true,
					},
					{
						id: 103,
						name: 'Combo Đất Nền Terrarium 3 Lớp',
						image: 'https://pos.nvncdn.com/524fc3-178700/ps/20250423_dd4liBuXnx.jpeg?v=1745413756',
						price: 120000,
						discount: 10,
						rating: 5.0,
						isInWishlist: false,
					},
					{
						id: 104,
						name: 'Cây Fittonia Xanh Gân Trắng',
						image: 'https://dalat.flowers/ShowTopicSubImage.aspx?id=38057',
						price: 45000,
						discount: 0,
						rating: 4.7,
						isInWishlist: true,
					},
					{
						id: 105,
						name: 'Đèn LED Chiếu Sáng Kẹp Thành Bể',
						image: 'https://cacanhkimgiang.com/wp-content/uploads/2020/09/den-roxin-k400.jpg',
						price: 220000,
						discount: 21,
						rating: 4.6,
						isInWishlist: false,
					},
					{
						id: 106,
						name: 'Đá Tai Mèo Mini Set 500g',
						image: 'https://terrariumvibe.com/wp-content/uploads/2025/05/da-tai-meo-1.jpg',
						price: 35000,
						discount: 0,
						rating: 4.9,
						isInWishlist: false,
					},
					{
						id: 107,
						name: 'Bộ Dụng Cụ Chăm Sóc 3 Món Inox',
						image: 'https://www.dtcworld.com.vn/storage/product-images/4140/Cutlery%20Set_20230329151347.jpg',
						price: 180000,
						discount: 15,
						rating: 4.8,
						isInWishlist: false,
					},
					{
						id: 108,
						name: 'Bình Xịt Phun Sương Cấp Ẩm Cao Cấp',
						image: 'https://bizweb.dktcdn.net/100/460/752/products/binh-xit-650ml.jpg?v=1723690487857',
						price: 85000,
						discount: 22,
						rating: 4.9,
						isInWishlist: true,
					},
				],
				meta: {
					totalItems: 10,
					itemsPerPage: 10,
					totalPages: 8,
					currentPage: 1,
				},
			});
		}, 600);
	});
};

export const removeProductFromWishlist = async (productId: number): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, 600);
	});
};
