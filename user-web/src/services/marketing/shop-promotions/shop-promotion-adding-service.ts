import { ProductPromotionForAdding } from '@/types/marketing/shop-promotions/ProductPromotionForAdding';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';

export async function getAvailableProductsForPromotion(): Promise<ProductPromotionForAdding[]> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						id: '1a2b3c4d-1111-4aaa-8bbb-111111111111', // Đã chuyển sang GUID string
						productVariantName: 'Bàn phím cơ RK84',
						salePrice: 950000,
						discountPrice: 800000,
						discount: calculateDiscount(950000, 800000),
						status: 'active',
						systemStatus: 'rejected',
					},
					{
						id: '2b3c4d5e-2222-4aaa-8bbb-222222222222', // Đã chuyển sang GUID string
						productVariantName: 'Chuột Logitech G Pro X',
						salePrice: 2100000,
						discountPrice: 190000,
						discount: calculateDiscount(2100000, 190000),
						status: 'inactive',
						systemStatus: 'approved',
					},
					{
						id: '3c4d5e6f-3333-4aaa-8bbb-333333333333', // Đã chuyển sang GUID string
						productVariantName: 'Tai nghe HyperX Cloud II',
						salePrice: 1850000,
						discountPrice: 1550000,
						discount: calculateDiscount(1850000, 1550000),
						status: 'discontinued',
						systemStatus: 'banned',
					},
					{
						id: '4d5e6f7a-4444-4aaa-8bbb-444444444444', // Đã chuyển sang GUID string
						productVariantName: 'Màn hình LG 24MP60G',
						salePrice: 3200000,
						discountPrice: 2900000,
						discount: calculateDiscount(3200000, 2900000),
						status: 'active',
						systemStatus: 'pending_approval',
					},
				]),
			500,
		);
	});
}
