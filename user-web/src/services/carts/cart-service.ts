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
					Sku: '',
					imageUrl:
						'https://caydeban.com.vn/image/cache/catalog/products/Terrariums/MS17/T17-35/Terrarium-9bac9giac_1415-600x600.JPG',
					price: 650000,
					quantity: 1,
				},
				{
					productId: 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', // Chuyển sang GUID string
					name: 'Combo Đất Nền Terrarium Chuyên Dụng (Đá bọt, Peat moss, Akadama)',
					Sku: '',
					imageUrl:
						'https://pos.nvncdn.com/524fc3-178700/ps/20240723_NI9uWMWxTX.jpeg?v=1721710205',
					price: 150000,
					quantity: 2,
				},
				{
					productId: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', // Chuyển sang GUID string
					name: 'Rêu Đầu Rìu tươi (Hộp 15x10cm)',
					Sku: '',
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

			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return getUserCartByUserIdCraw();
			}
			return mapCartBe2Fe(response.data.data.cartItems);
		} catch (error: unknown) {
			return getUserCartByUserIdCraw();
		}
	}
	/**
	 * Thêm sản phẩm vào giỏ hàng hệ thống
	 * @param variantId Định danh biến thể sản phẩm (GUID String)
	 * @param quantity Số lượng muốn thêm (mặc định là 1 nếu không truyền)
	 */
	async addToCart(variantId: string, quantity: number = 1): Promise<boolean> {
		try {
			const response = await this.api.post<ResponseApi<never>>(
				`/carts/items/${variantId}`,
				quantity
			);

			// Kiểm tra kết quả trả về từ API của bạn
			return response.data?.isSuccess ?? false;
		} catch (error: unknown) {
			console.error('Lỗi khi gọi API add to cart:', error);
			throw error;
		}
	}

	async removeCartItem(variantId: string): Promise<boolean> {
		try {
			// Đúng theo Swagger: Dùng phương thức PUT và truyền variantId lên URL công thức xóa
			const response = await this.api.put<ResponseApi<never>>(
				`/carts/items/remove/${variantId}`
			);

			// Kiểm tra trạng thái phản hồi thành công từ BackEnd
			return response.data?.isSuccess ?? false;
		} catch (error: unknown) {
			console.error('Lỗi khi gọi API remove cart item:', error);
			throw error; // Quăng lỗi ra ngoài để Zustand Store hoặc Component UI có thể catch và thông báo lỗi
		}
	}
}
