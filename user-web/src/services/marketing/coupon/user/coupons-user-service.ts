import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';

export async function getCouponsByUserId(userId: number): Promise<UserCoupon[]> {
	// Giả lập độ trễ của API là 800ms
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					title: 'Giảm 20%',
					couponType: 'sale',
					description: 'Giảm tối đa 100.000đ cho đơn từ 500.000đ',
					expiredAt: '28/02/2026',
					code: 'SALE20',
				},
				{
					id: 2,
					title: 'Freeship',
					couponType: 'ship',
					description: 'Miễn phí vận chuyển cho đơn từ 200.000đ',
					expiredAt: '05/03/2026',
					code: 'FREESHIP',
				},
			]);
		}, 800);
	});
}

export const getPlatformCoupons = async (): Promise<UserCoupon[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					title: 'Giảm 50K Đơn từ 300K',
					couponType: 'sale',
					description: 'Áp dụng cho tất cả sản phẩm hệ sinh thái Terrarium.',
					expiredAt: '2026-05-30T23:59:59Z',
					code: 'TERRA50K',
				},
				{
					id: 2,
					title: 'Freeship 30K',
					couponType: 'ship',
					description: 'Miễn phí vận chuyển cho đơn hàng từ 150K.',
					expiredAt: '2026-05-31T23:59:59Z',
					code: 'FREESHIP30',
				},
				{
					id: 3,
					title: 'Giảm 15% Tối đa 100K',
					couponType: 'sale',
					description: 'Áp dụng riêng cho danh mục Bể kính và Đèn LED.',
					expiredAt: '2026-06-15T23:59:59Z',
					code: 'SALE15PT',
				},
			]);
		}, 500); // Giả lập delay 0.5s
	});
};

export const claimCoupon = async (couponCode: string): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			// Xử lý logic gọi axios ở đây...
			console.log(`[API] Đã lưu mã: ${couponCode}`);
			resolve(true); // Trả về thành công
		}, 500);
	});
};