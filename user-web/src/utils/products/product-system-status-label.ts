import { ProductSystemStatus } from "@/types/products/admin/variant/ProductSystemStatus";

const PRODUCT_SYSTEM_STATUS_LABEL: Record<ProductSystemStatus, string> = {
    pending_approval: 'Chờ duyệt',
    approved: 'Đã duyệt',
    rejected: 'Từ chối',
    banned: 'Bi khoá',
};

export const getProductSystemStatusLabel = (status: ProductSystemStatus): string => {
    return PRODUCT_SYSTEM_STATUS_LABEL[status] ?? 'Không xác định';
};