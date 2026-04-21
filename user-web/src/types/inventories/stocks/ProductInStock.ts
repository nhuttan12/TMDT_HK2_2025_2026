import { ReplenishmentLevel } from '@/types/inventories/stocks/ReplenishmentLevel';

export interface ProductInStock {
	id: number;
	productId: number;
	productVariantId: number;
	image: string;
	name: string;
	variantSku: string;
	replenishment: ReplenishmentLevel;
	stock: number;
	sales7d: number;
	sales30d: number;
	supplierName: string;
}