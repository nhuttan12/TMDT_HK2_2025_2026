import {
	getApprovalShops,
	GetApprovalShopsParams,
	getShopRegistrationFormByApprovalId,
} from '@/services/shops/admin/shop-approval-service';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ShopApproval } from '@/types/shops/admin/ShopApproval';
import { ShopRegistrationForm } from '@/types/shops/user/ShopRegistrationForm';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useShopApprovalQuery = (
	params: GetApprovalShopsParams,
	initialData?: PaginationResponse<ShopApproval>,
): UseQueryResult<PaginationResponse<ShopApproval>, Error> => {
	return useQuery({
		queryKey: ['admin-shop-approvals', params],
		queryFn: () => getApprovalShops(params),
		initialData,
		staleTime: 5 * 60 * 1000,
	});
};

export const useShopApprovalDetailQuery = (
	approvalId: number,
	initialData?: ShopRegistrationForm,
): UseQueryResult<ShopRegistrationForm, Error> => {
	return useQuery({
		// Key chứa cả approvalId để cache riêng biệt cho từng đơn
		queryKey: ['admin-shop-approval-detail', approvalId],
		queryFn: () => getShopRegistrationFormByApprovalId(approvalId),

		// Dùng initialData (từ Server Component truyền xuống) để render ngay lập tức (SEO & UX)
		initialData,

		// Chỉ kích hoạt query khi approvalId hợp lệ (lớn hơn 0)
		enabled: !!approvalId,

		// Giữ data tươi trong 5 phút
		staleTime: 5 * 60 * 1000,
	});
};
