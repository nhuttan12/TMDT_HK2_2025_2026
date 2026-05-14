import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

export const getShopCouponsByShopId = async (
	shopId: number,
): Promise<PaginationResponse<AdminCoupon>> => {
	return new Promise((resolve): void => {
		setTimeout((): void => {
			resolve({
				data: [
					{
						id: 1,
						code: 'FREESHIP50K',
						name: 'Miễn phí vận chuyển',
						scope: 'shop',
						shopId: null,
						discountType: 'fixed_amount',
						discountValue: 50000,
						maxDiscountAmount: null,
						minOrderValue: 150000,
						totalQuantity: 1000,
						usedQuantity: 450,
						validTime: {
							fromDate: '2026-04-01T00:00:00Z',
							toDate: '2026-05-01T23:59:59Z',
						},
						status: 'active',
					},
					{
						id: 2,
						code: 'TET2026',
						name: 'Giảm giá Tết',
						scope: 'shop',
						shopId: 'shop_123',
						discountType: 'percentage',
						discountValue: 10,
						maxDiscountAmount: 30000,
						minOrderValue: 100000,
						totalQuantity: 500,
						usedQuantity: 500,
						validTime: {
							fromDate: '2026-01-01T00:00:00Z',
							toDate: '2026-02-01T23:59:59Z',
						},
						status: 'expired',
					},
				],
				meta: {
					totalItems: 2,
					totalPages: 1,
					currentPage: 1,
					itemsPerPage: 10,
				},
			});
		}, 800);
	});
};

export const deleteVoucher = async (id: string): Promise<boolean> => {
	return new Promise((resolve): void => {
		setTimeout((): void => {
			resolve(true); // Giả lập xóa thành công
		}, 500);
	});
};

export const getPlatformCoupons = async (): Promise<PaginationResponse<AdminCoupon>> => {
	return new Promise((resolve): void => {
		setTimeout((): void => {
			resolve({
				meta: { totalItems: 2, totalPages: 1, currentPage: 1, itemsPerPage: 10 },
				data: [
					{
						id: 1,
						code: 'FREESHIP50K',
						name: 'Miễn phí vận chuyển',
						scope: 'platform',
						shopId: null,
						discountType: 'fixed_amount',
						discountValue: 50000,
						maxDiscountAmount: null,
						minOrderValue: 150000,
						totalQuantity: 1000,
						usedQuantity: 450,
						validTime: {
							fromDate: '2026-04-01T00:00:00Z',
							toDate: '2026-05-01T23:59:59Z',
						},
						status: 'active',
					},
					{
						id: 2,
						code: 'TET2026',
						name: 'Giảm giá Tết',
						scope: 'platform',
						shopId: null,
						discountType: 'percentage',
						discountValue: 10,
						maxDiscountAmount: 30000,
						minOrderValue: 100000,
						totalQuantity: 500,
						usedQuantity: 500,
						validTime: {
							fromDate: '2026-01-01T00:00:00Z',
							toDate: '2026-02-01T23:59:59Z',
						},
						status: 'expired',
					},
				],
			});
		}, 800);
	});
};

export const getCouponDetailById = async (couponId: number): Promise<AdminCoupon> => {
	return new Promise((resolve): void => {
		setTimeout((): void => {
			resolve({
				id: couponId,
				code: 'FREESHIP50K',
				name: 'Miễn phí vận chuyển (Mock Data)',
				scope: 'platform',
				shopId: null,
				discountType: 'fixed_amount',
				discountValue: 50000,
				maxDiscountAmount: null,
				minOrderValue: 150000,
				totalQuantity: 1000,
				usedQuantity: 450,
				validTime: {
					fromDate: '2026-04-01T00:00:00Z',
					toDate: '2026-05-01T23:59:59Z',
				},
				status: 'active',
			});
		}, 800);
	});
};