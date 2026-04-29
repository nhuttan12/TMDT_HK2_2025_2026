import { ShopProductPromotion } from '@/types/marketing/shop-promotions/ShopProductPromotion';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';

export async function getStoreProductPromotions(id: number): Promise<ShopProductPromotion[]> {
	return new Promise((resolve) =>
		setTimeout(
			() =>
				resolve([
					{
						id: 1,
						productId: 1,
						productVariantId: 1,
						productName: 'Bàn phím cơ RK84',
						createdAt: '2024-03-01T10:00:00Z',
						updatedAt: '2024-03-05T15:30:00Z',
						salePrice: 950000,
						discountPrice: 800000,
						discount: calculateDiscount(950000, 800000),
						status: false,
					},
					{
						id: 2,
						productId: 1,
						productVariantId: 2,
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
