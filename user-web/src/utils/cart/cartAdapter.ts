import { CartItem } from '@/types/carts/CartItem';
import { BackEndCartItem } from '@/types/carts/BeackEndCart';

export function mapCartBe2Fe(data: BackEndCartItem[]): CartItem[] {
	if (!data || data.length === 0) return [];

	return data.map((item: BackEndCartItem) => ({
		// Ưu tiên lấy variantId làm ID để xử lý logic ở Frontend,
		// nếu null/undefined thì dùng tạm productId
		productId: item.variantId || item.productId,

		// Ép kiểu any phòng trường hợp interface BackEndCartItem chưa kịp bổ sung productName
		name: (item as any).productName || 'Sản phẩm chưa có tên',

		imageUrl: item.imageUrl,

		// Map đúng từ trường unitPrice của Backend sang price của Frontend
		price: item.unitPrice,

		quantity: item.quantity,
	}));
}