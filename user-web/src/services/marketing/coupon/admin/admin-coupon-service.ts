import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

export const getShopCouponsByShopId = async (
	shopId: string,
): Promise<PaginationResponse<AdminCoupon>> => {
	return new Promise((resolve): void => {
		setTimeout((): void => {
			resolve({
				data: [
					{
						id: 'bc7b2671-5085-40b9-a9a2-944a86f7df21',
						code: 'FREESHIP50K',
						name: 'Miễn phí vận chuyển',
						scope: 'shop',
						shopId: shopId,
						category: 'shipping',
						discountType: 'fixed_amount',
						discountValue: 50000,
						maxDiscountAmount: null,
						minInvoiceValue: 150000,
						totalQuantity: 1000,
						usedQuantity: 450,
						validTime: {
							fromDate: '2026-04-01T00:00:00Z',
							toDate: '2026-05-01T23:59:59Z',
						},
						status: 'active',
					},
					{
						id: 'fa4109bd-7589-4e78-bad4-10672ce893bc', // Đã đổi sang GUID
						code: 'TET2026',
						name: 'Giảm giá Tết',
						scope: 'shop',
						shopId: shopId,
						category: 'discount',
						discountType: 'percentage',
						discountValue: 10,
						maxDiscountAmount: 30000,
						minInvoiceValue: 100000,
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
						id: 'c8e1467a-1234-4f01-a12b-d32109876543', // Đổi sang GUID string
						code: 'FREESHIP50K',
						name: 'Miễn phí vận chuyển',
						scope: 'platform',
						shopId: null,
						discountType: 'fixed_amount',
						category: 'shipping',
						discountValue: 50000,
						maxDiscountAmount: null,
						minInvoiceValue: 150000,
						totalQuantity: 1000,
						usedQuantity: 450,
						validTime: {
							fromDate: '2026-04-01T00:00:00Z',
							toDate: '2026-05-01T23:59:59Z',
						},
						status: 'active',
					},
					{
						id: 'a9b2345c-6789-4e21-b34c-f98765432109', // Đổi sang GUID string
						code: 'TET2026',
						name: 'Giảm giá Tết',
						scope: 'platform',
						shopId: null,
						category: 'discount',
						discountType: 'percentage',
						discountValue: 10,
						maxDiscountAmount: 30000,
						minInvoiceValue: 100000,
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

export const getCouponDetailById = async (couponId: string): Promise<AdminCoupon> => {
	return new Promise((resolve): void => {
		setTimeout((): void => {
			resolve({
				id: 'c8e1467a-1234-4f01-a12b-d32109876543', // Đổi sang GUID string
				code: 'FREESHIP50K',
				name: 'Miễn phí vận chuyển',
				scope: 'platform',
				shopId: null,
				category: 'shipping',
				discountType: 'fixed_amount',
				discountValue: 50000,
				maxDiscountAmount: null,
				minInvoiceValue: 150000,
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
