import { ProductVariantStatus } from '@/types/products/admin/variant/ProductVariantStatus';

const PRODUCT_VARIANT_STATUS_LABEL: Record<ProductVariantStatus, string> = {
	active: 'Đang hoạt động',
	inactive: 'Ngừng hoạt động',
	discontinued: 'Ngừng kinh doanh',
};

export function getProductVariantStatusLabel(status: ProductVariantStatus): string {
	return PRODUCT_VARIANT_STATUS_LABEL[status] ?? 'Không xác định';
}