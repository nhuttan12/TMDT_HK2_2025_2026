import { StoreProductPromotion } from '@/types/marketing/store-product-promotions/StoreProductPromotion';

export async function getStoreProductPromotions(): Promise<StoreProductPromotion[]> {
	return new Promise((resolve) =>
		setTimeout(
			() =>
				resolve([
					{
						id: 1,
						productName: 'Bàn phím cơ RK84',
						createdAt: '2024-03-01T10:00:00Z',
						updatedAt: '2024-03-05T15:30:00Z',
						promotionPrice: 950000,
						discount: 15,
					},
					{
						id: 2,
						productName: 'Chuột Logitech G Pro X',
						createdAt: '2024-03-10T08:20:00Z',
						updatedAt: '2024-03-12T09:00:00Z',
						promotionPrice: 2100000,
						discount: 10,
					},
				]),
			500,
		),
	);
}
