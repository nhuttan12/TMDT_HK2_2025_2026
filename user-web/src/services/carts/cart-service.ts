import { CartItem } from '@/types/carts/CartItem';
import { BackEndCart } from '@/types/carts/BeackEndCart';
import { mapCartBe2Fe } from '@/utils/cart/cartAdapter';
import { ResponseApi } from '@/types/common/ResponseApi';
import {type AxiosInstance } from 'axios';

export async function getUserCartByUserIdCraw(): Promise<CartItem[]> {
	// Giả lập độ trễ của API
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					productId: 'e1d2c3b4-5a6b-7c8d-9e0f-1a2b3c4d5e6f', // Chuyển sang GUID string
					name: 'Bể kính tiểu cảnh Terrarium Đa Giác (Size M)',
					imageUrl:
						'https://caydeban.com.vn/image/cache/catalog/products/Terrariums/MS17/T17-35/Terrarium-9bac9giac_1415-600x600.JPG',
					price: 650000,
					quantity: 1,
				},
				{
					productId: 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', // Chuyển sang GUID string
					name: 'Combo Đất Nền Terrarium Chuyên Dụng (Đá bọt, Peat moss, Akadama)',
					imageUrl:
						'https://pos.nvncdn.com/524fc3-178700/ps/20240723_NI9uWMWxTX.jpeg?v=1721710205',
					price: 150000,
					quantity: 2,
				},
				{
					productId: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', // Chuyển sang GUID string
					name: 'Rêu Đầu Rìu tươi (Hộp 15x10cm)',
					imageUrl:
						'https://pos.nvncdn.com/524fc3-178700/ps/20240723_NI9uWMWxTX.jpeg?v=1721710205',
					price: 85000,
					quantity: 3,
				},
			]);
		}, 500);
	});
}

export class CartService {
	constructor(private api: AxiosInstance) {}

	async getMyUserCart(): Promise<CartItem[]> {
		try {
			const response =
				await this.api.get<ResponseApi<BackEndCart>>(`/carts/me`);

			console.log('cart data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return getUserCartByUserIdCraw();
			}
			return mapCartBe2Fe(response.data.data.cartItems);
		} catch (error: unknown) {
			return getUserCartByUserIdCraw();
		}
	}
}
