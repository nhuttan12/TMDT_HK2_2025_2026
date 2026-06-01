import { ShopProductPromotion } from '@/types/marketing/shop-promotions/ShopProductPromotion';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';

export async function getStoreProductPromotions(id: string): Promise<ShopProductPromotion[]> {
	return new Promise((resolve) =>
		setTimeout(
			() =>
				resolve([
					{
						id: 'd290f1ee-6c54-4b01-90e6-d701748f0851', // GUID của đợt khuyến mãi
						productId: '550e8400-e29b-41d4-a716-446655440000', // GUID của sản phẩm (Bàn phím)
						productVariantId: 'c8e1467a-1234-4f01-a12b-d32109876543', // GUID của biến thể
						productName: 'Bàn phím cơ RK84',
						createdAt: '2024-03-01T10:00:00Z',
						updatedAt: '2024-03-05T15:30:00Z',
						salePrice: 950000,
						discountPrice: 800000,
						discount: calculateDiscount(950000, 800000),
						status: false,
					},
					{
						id: 'a38c92a2-8302-4543-9824-7389a19c6310', // GUID của đợt khuyến mãi
						productId: '123e4567-e89b-12d3-a456-426614174000', // Đã sửa: Cấp GUID khác cho Chuột Logitech
						productVariantId: 'a9b2345c-6789-4e21-b34c-f98765432109', // GUID của biến thể
						productName: 'Chuột Logitech G Pro X',
						createdAt: '2024-03-10T08:20:00Z',
						updatedAt: '2024-03-12T09:00:00Z',
						salePrice: 2100000,
						discountPrice: 1900000,
						discount: calculateDiscount(2100000, 1900000),
						status: true,
					},
				]),
			500,
		),
	);
}
