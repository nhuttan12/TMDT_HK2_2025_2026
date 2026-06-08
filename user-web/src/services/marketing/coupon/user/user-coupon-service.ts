import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';

export const getCouponsByUserId = async (userId: string): Promise<UserCoupon[]> => {
	return new Promise((resolve) => {
		setTimeout((): void => {
			resolve([
				{
					id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
					code: 'SALE20',
					name: 'Giảm 20%',
					scope: 'shop',
					category: 'discount',
					status: 'active',
					shopId: 'shop_123',
					discountType: 'percentage',
					discountValue: 20,
					maxDiscountAmount: 50000,
					minOrderValue: 150000,
					validTime: {
						fromDate: '2026-05-01T00:00:00Z',
						toDate: '2026-05-31T23:59:59Z',
					},
					userSavedStatus: 'saved',
				},
				{
					id: 'a38c92a2-8302-4543-9824-7389a19c6310',
					code: 'FREESHIP',
					name: 'Miễn phí vận chuyển',
					scope: 'platform',
					category: 'shipping',
					status: 'expired',
					shopId: null,
					discountType: 'fixed_amount',
					discountValue: 30000,
					maxDiscountAmount: 30000,
					minOrderValue: 200000,
					validTime: {
						fromDate: '2026-05-01T00:00:00Z',
						toDate: '2026-06-05T23:59:59Z',
					},
					userSavedStatus: 'saved',
				},
			]);
		}, 800);
	});
};

export const getPlatformCoupons = async (): Promise<UserCoupon[]> => {
	return new Promise((resolve) => {
		setTimeout((): void => {
			resolve([
				{
					id: '7b233a01-5242-4f3b-8531-180a3a7800ab',
					code: 'TERRA50K',
					name: 'Giảm 50K Đơn từ 300K',
					scope: 'platform',
					category: 'discount',
					status: 'disabled',
					shopId: null,
					discountType: 'fixed_amount',
					discountValue: 50000,
					maxDiscountAmount: 50000,
					minOrderValue: 300000,
					validTime: {
						fromDate: '2026-05-01T00:00:00Z',
						toDate: '2026-05-30T23:59:59Z',
					},
					userSavedStatus: 'not_saved',
				},
			]);
		}, 500);
	});
};

export const getShopPublicCoupons = async (shopId: number): Promise<UserCoupon[]> => {
	return new Promise((resolve) => {
		setTimeout((): void => {
			resolve([
				{
					id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
					code: 'TECH100',
					name: 'Giảm 100K',
					scope: 'shop',
					category: 'discount',
					status: 'upcoming',
					shopId: shopId.toString(),
					discountType: 'fixed_amount',
					discountValue: 100000,
					maxDiscountAmount: 100000,
					minOrderValue: 500000,
					validTime: {
						fromDate: '2026-05-01T00:00:00Z',
						toDate: '2026-06-30T23:59:59Z',
					},
					userSavedStatus: 'not_saved',
				},
				{
					id: 'e58ed763-928c-4155-bee9-fdbaaadc15f3',
					code: 'FREESHIP30',
					name: 'Miễn phí vận chuyển',
					scope: 'shop',
					category: 'shipping',
                    status: 'active',
					shopId: shopId.toString(),
					discountType: 'fixed_amount',
					discountValue: 30000,
					maxDiscountAmount: 30000,
					minOrderValue: 150000,
					validTime: {
						fromDate: '2026-05-01T00:00:00Z',
						toDate: '2026-05-15T23:59:59Z',
					},
					userSavedStatus: 'used_up',
				},
			]);
		}, 600);
	});
};

export const claimCoupon = async (couponId: string): Promise<boolean> => {
	// Nhận GUID string
	return new Promise((resolve) => {
		setTimeout((): void => {
			console.log(`[API] Đã lưu mã có ID: ${couponId}`);
			resolve(true);
		}, 500);
	});
};
