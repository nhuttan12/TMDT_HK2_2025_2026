import { ProductSystemStatus } from '@/types/products/admin/variant/ProductSystemStatus';
import { ProductVariantStatus } from '@/types/products/admin/variant/ProductVariantStatus';

export interface ProductPromotionForAdding {
	id: string;
	productVariantName: string;
	salePrice: number;
	discountPrice: number;
	discount: number;
	status: ProductVariantStatus;
    systemStatus: ProductSystemStatus;
}