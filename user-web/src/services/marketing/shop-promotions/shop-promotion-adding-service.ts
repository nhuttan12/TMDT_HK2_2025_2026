import { ProductPromotionForAdding } from '@/types/marketing/shop-promotions/ProductPromotionForAdding';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';

export async function getAvailableProductsForPromotion(): Promise<ProductPromotionForAdding[]> {
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						id: 1,
						productVariantName: 'Bàn phím cơ RK84',
						salePrice: 950000,
						discountPrice: 800000,
						discount: calculateDiscount(950000, 800000),
						status: 'active',
						systemStatus: 'rejected',
					},
					{
						id: 2,
						productVariantName: 'Chuột Logitech G Pro X',
						salePrice: 2100000,
						discountPrice: 190000,
						discount: calculateDiscount(2100000, 190000),
						status: 'inactive',
						systemStatus: 'approved',
					},
					{
						id: 3,
						productVariantName: 'Tai nghe HyperX Cloud II',
						salePrice: 1850000,
						discountPrice: 1550000,
						discount: calculateDiscount(1850000, 1550000),
						status: 'discontinued',
						systemStatus: 'banned',
					},
					{
						id: 4,
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
