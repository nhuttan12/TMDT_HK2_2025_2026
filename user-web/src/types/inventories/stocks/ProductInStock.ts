import { ReplenishmentLevel } from '@/types/inventories/stocks/ReplenishmentLevel';

export interface ProductInStock {
	id: string;
	productId: string;
	productVariantId: string;
	image: string;
	name: string;
	variantSku: string;
	replenishment: ReplenishmentLevel;
	stock: number;
	sales7d: number;
	sales30d: number;
}