import { CartItem } from '@/types/carts/CartItem';

export async function getUserCartByUserId(userId: number): Promise<CartItem[]> {
	// Giả lập độ trễ của API
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					productId: 101,
					name: 'Bể kính tiểu cảnh Terrarium Đa Giác (Size M)',
					imageUrl:
						'https://caydeban.com.vn/image/cache/catalog/products/Terrariums/MS17/T17-35/Terrarium-9bac9giac_1415-600x600.JPG',
					price: 650000,
					quantity: 1,
				},
				{
					productId: 102,
					name: 'Combo Đất Nền Terrarium Chuyên Dụng (Đá bọt, Peat moss, Akadama)',
					imageUrl:
						'https://pos.nvncdn.com/524fc3-178700/ps/20240723_NI9uWMWxTX.jpeg?v=1721710205',
					price: 150000,
					quantity: 2,
				},
				{
					productId: 103,
					name: 'Rêu Đầu Rìu tươi (Hộp 15x10cm)',
					imageUrl:
						'https://caydeban.com.vn/image/cache/catalog/products/Terrariums/MS01/Terrarium-MS01_6634-600x600.JPG',
					price: 85000,
					quantity: 3,
				},
			]);
		}, 500);
	});
}
