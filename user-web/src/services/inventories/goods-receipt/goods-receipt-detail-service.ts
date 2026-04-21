import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';

export const getGoodsReceiptById = async (id: number): Promise<GoodsReceiptDetail> => {
	// Giả lập network delay để test UX loading sau này
	await new Promise((resolve) => setTimeout(resolve, 300));

	// Trả về mock data (Sử dụng id được truyền vào để map với dữ liệu giả)
	return {
		id: id,
		code: `PNK-00${id}`, // Giả lập code thay đổi theo ID
		supplierID: 1,
		supplierName: 'Công ty ABC',
		importDate: new Date().toISOString(),
		importStatus: 'draft',
		note: 'Hàng test',
		batches: [
			{
				id: 1,
				productId: 101,
				productName: 'iPhone 15 Pro Max',
				batchNumber: 'BATCH-001',
				quantity: 10,
				unitPrice: 30000000,
				totalPrice: 300000000,
				manufacturedAt: '2025-01-01',
				expiredAt: undefined,
				isSerialInputted: true,
			},
			{
				id: 2,
				productId: 102,
				productName: 'Samsung S24 Ultra',
				batchNumber: 'BATCH-002',
				quantity: 5,
				unitPrice: 25000000,
				totalPrice: 125000000,
				isSerialInputted: false,
			},
		],
	};
};
