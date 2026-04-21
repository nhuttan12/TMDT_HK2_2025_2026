import { Coupon } from '@/types/coupons/Coupon';

export async function getCouponsByUserId(userId: number): Promise<Coupon[]> {
	// Giả lập độ trễ của API là 800ms
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: '1',
					title: 'Giảm 20%',
					couponType: 'Sale',
					description: 'Giảm tối đa 100.000đ cho đơn từ 500.000đ',
					expiredAt: '28/02/2026',
					code: 'SALE20',
				},
				{
					id: '2',
					title: 'Freeship',
					couponType: 'Ship',
					description: 'Miễn phí vận chuyển cho đơn từ 200.000đ',
					expiredAt: '05/03/2026',
					code: 'FREESHIP',
				},
			]);
		}, 800);
	});
}
