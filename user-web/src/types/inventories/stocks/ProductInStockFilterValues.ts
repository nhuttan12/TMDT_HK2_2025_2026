import { ReplenishmentLevel } from '@/types/inventories/stocks/ReplenishmentLevel';

export interface ProductInStockFilterValues {
	// Tìm kiếm text (có thể tuỳ chọn dùng từng field riêng hoặc 1 field chung)
	name?: string;
	variantSku?: string;
	supplierName?: string;

	replenishment?: ReplenishmentLevel;

	// Lọc theo khoảng số lượng tồn kho
	minStock?: number;
	maxStock?: number;

	// Lọc theo khoảng số lượng bán trong 7 ngày
	minSales7d?: number;
	maxSales7d?: number;

	// Lọc theo khoảng số lượng bán trong 30 ngày
	minSales30d?: number;
	maxSales30d?: number;
}
