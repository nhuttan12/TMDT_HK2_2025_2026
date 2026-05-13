import { JSX } from 'react';
import { Metadata } from 'next';
import { getShopCouponsByShopId } from '@/services/marketing/coupon/admin/coupon-admin-service';
import { CouponManagementContainer } from '@/components/marketing/coupons/admin/coupon-management-container';

export const metadata: Metadata = {
	title: 'Danh sách mã giảm giá của cửa hàng',
};

interface Props {
	params: Promise<{ shopPromotionId: string }>;
}

export default async function ShopCouponPage({ params }: Props): Promise<JSX.Element> {
	const { shopPromotionId } = await params;
	const id = parseInt(shopPromotionId);

	// Gọi API/Service tại Server
	const initialCoupons = await getShopCouponsByShopId(id);

	return (
		<CouponManagementContainer
			scope='shop'
			role={'shop-owner'}
			shopId={id}
			initialCoupons={initialCoupons}
		/>
	);
}
