import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';

export function useGoodsReceiptData() {
	const mockProducts: ProductForGoodsReceipt[] = [
		{ id: 1, name: 'iPhone 15 Pro Max', status: true },
		{ id: 2, name: 'Samsung Galaxy S24 Ultra', status: true },
		{ id: 3, name: 'MacBook Pro 16"', status: true },
		{ id: 4, name: 'iPad Air', status: false },
		{ id: 5, name: 'AirPods Pro', status: true },
		{ id: 6, name: 'Sony WH-1000XM5', status: true },
		{ id: 7, name: 'Apple Watch Series 9', status: false },
		{ id: 8, name: 'Dell XPS 15', status: true },
	];

	// Sau này bạn có thể thay thế bằng logic gọi API thực tế ở đây
	return {
		mockProducts,
	};
}
