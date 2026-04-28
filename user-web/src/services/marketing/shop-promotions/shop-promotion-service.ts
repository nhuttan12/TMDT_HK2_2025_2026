import { ShopPromotion } from '@/types/marketing/shop-promotions/ShopPromotion';

export async function getShopPromotions(): Promise<ShopPromotion[]> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						id: 1,
						name: 'Siêu Sale Sinh Nhật 4.4',
						status: true,
						arrange: {
							fromDate: '2026-04-01T00:00:00Z',
							toDate: '2026-04-05T23:59:59Z',
						},
						createdAt: '2024-03-20T10:00:00Z',
						updatedAt: '2024-03-25T15:30:00Z',
					},
					{
						id: 2,
						name: 'Mã Giảm Giá Tân Binh',
						status: false,
						arrange: {
							fromDate: '2026-05-01T00:00:00Z',
							toDate: '2026-05-31T23:59:59Z',
						},
						createdAt: '2024-04-01T08:20:00Z',
						updatedAt: '2024-04-02T09:00:00Z',
					},
				]),
			500,
		);
	});
}
