import { ApprovalShopsStatus } from "@/types/shops/admin/ApprovalShopsStatus";

// 1. Khai báo Record map sang tiếng Việt
export const ApprovalShopsStatusLabel: Record<ApprovalShopsStatus, string> = {
	'pending-approval': 'Chờ duyệt',
	'approved': 'Đã duyệt',
	'rejected': 'Từ chối',
};

// 2. Hàm helper convert ra tiếng Việt an toàn
export const getApprovalShopStatusLabel = (status: ApprovalShopsStatus): string => {
	// Fallback phòng hờ trường hợp data API trả về lỗi hoặc thiếu
	return ApprovalShopsStatusLabel[status] || 'Không xác định';
};
