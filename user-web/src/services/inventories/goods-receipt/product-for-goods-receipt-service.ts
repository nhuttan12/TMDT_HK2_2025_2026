import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';

export const getProductsForGoodsReceipt = async (): Promise<ProductForGoodsReceipt[]> => {
	return [
		{ id: 1, name: 'iPhone 15 Pro Max', status: true },
		{ id: 2, name: 'Samsung Galaxy S24 Ultra', status: true },
		{ id: 3, name: 'MacBook Pro 16"', status: true },
		{ id: 4, name: 'iPad Air', status: false },
		{ id: 5, name: 'AirPods Pro', status: true },
		{ id: 6, name: 'Sony WH-1000XM5', status: true },
		{ id: 7, name: 'Apple Watch Series 9', status: false },
		{ id: 8, name: 'Dell XPS 15', status: true },
	];
};

export const getProductVariants = async (): Promise<ProductVariantRow[]> => {
	return [
		{ id: 1, name: 'iPhone 15 Pro Max - 256GB - Titan Tự Nhiên', sku: 'IP15PM-256-TTN' },
		{ id: 2, name: 'iPhone 15 Pro Max - 512GB - Titan Xanh', sku: 'IP15PM-512-TX' },
		{ id: 3, name: 'iPhone 15 Pro - 128GB - Titan Đen', sku: 'IP15P-128-TD' },
		{ id: 4, name: 'Samsung S24 Ultra - 256GB - Đen', sku: 'SS24U-256-BLK' },
		{ id: 5, name: 'Samsung S24 Ultra - 512GB - Tím', sku: 'SS24U-512-PUR' },
		{ id: 6, name: 'Xiaomi 14 Pro - 256GB - Trắng', sku: 'XM14P-256-WHT' },
		{ id: 7, name: 'Xiaomi 14 Pro - 512GB - Xanh', sku: 'XM14P-512-BLU' },
		{ id: 8, name: 'OPPO Find X7 - 256GB - Đen', sku: 'OPPOX7-256-BLK' },
		{ id: 9, name: 'Vivo X100 Pro - 512GB - Cam', sku: 'VIVOX100P-512-ORG' },
		{ id: 10, name: 'Realme GT5 - 256GB - Bạc', sku: 'REALMEGT5-256-SLV' },
	];
};
