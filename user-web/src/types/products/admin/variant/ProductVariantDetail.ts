import { ProductVariantAttribute } from '@/types/products/admin/variant/ProductVariantAttribute';
import { ProductVariantStatus } from '@/types/products/admin/variant/ProductVariantStatus';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ProductVariantPricing } from '@/types/products/admin/variant/ProductVariantPricing';
import { ProductVariantInventory } from '@/types/products/admin/variant/ProductVariantInventory';
import { ProductVariantShipping } from '@/types/products/admin/variant/ProductVariantShipping';

export interface ProductVariantDetail {
	id: number;
	productId: number;

	name: string;
	sku: string;

	attributes: ProductVariantAttribute[];

	status: ProductVariantStatus;

	// pricing
	pricing: ProductVariantPricing;

	// supplier
	supplierName: string;

	// inventory
	inventory: ProductVariantInventory;

	// shipping
	shipping?: ProductVariantShipping;

	// media
	images: SortableImageForm[];

	// audit
	createdAt: string;
	updatedAt: string;
	createdBy?: number;
	updatedBy?: number;
}
