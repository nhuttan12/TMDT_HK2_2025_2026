import { ProductSystemStatus } from '@/types/products/admin/variant/ProductSystemStatus';
import { ProductVariantStatus } from '@/types/products/admin/variant/ProductVariantStatus';

export interface ProductPromotionForSelection {
	id: number;
	productVariantName: string;
	salePrice: number;
	status: ProductVariantStatus;
	systemStatus: ProductSystemStatus;
}
