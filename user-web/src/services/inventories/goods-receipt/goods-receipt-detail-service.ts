import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
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

export const getProductListInBatch = async (): Promise<BatchItemSerial[]> => {
	// Giả lập network delay để test UX loading sau này
	await new Promise((resolve) => setTimeout(resolve, 300));

	// Trả về mock data (Sử dụng id được truyền vào để map với dữ liệu giả)
	return [
		{
			id: 1,
			productId: 201,
			batchId: 1,
			productVariantId: 101,
			productVariantName: 'iPhone 15 Pro Max 256GB',
			serialNumber: 'SN-IP15PM-0001',
			appearanceCondition: 'Mới 100%',
			status: 'in_stock',
			importDate: '2026-03-01',
			expiredAt: undefined,
		},
		{
			id: 2,
			productId: 202,
			batchId: 1,
			productVariantId: 101,
			productVariantName: 'iPhone 15 Pro Max 256GB',
			serialNumber: 'SN-IP15PM-0002',
			appearanceCondition: 'Mới 100%',
			status: 'sold',
			importDate: '2026-03-01',
		},
		{
			id: 3,
			productId: 203,
			batchId: 1,
			productVariantId: 101,
			productVariantName: 'iPhone 15 Pro Max 256GB',
			serialNumber: 'SN-IP15PM-0003',
			appearanceCondition: 'Trầy nhẹ',
			status: 'defective',
			importDate: '2026-03-01',
		},
		{
			id: 4,
			productId: 204,
			batchId: 2,
			productVariantId: 102,
			productVariantName: 'Samsung S24 Ultra',
			serialNumber: 'SN-SS24U-0001',
			appearanceCondition: 'Mới 100%',
			status: 'in_stock',
			importDate: '2026-03-05',
		},
		{
			id: 5,
			productId: 205,
			batchId: 2,
			productVariantId: 102,
			productVariantName: 'Samsung S24 Ultra',
			serialNumber: 'SN-SS24U-0002',
			appearanceCondition: 'Mới 100%',
			status: 'sold',
			importDate: '2026-03-05',
		},
		{
			id: 6,
			productId: 206,
			batchId: 3,
			productVariantId: 103,
			productVariantName: 'MacBook Pro M3',
			serialNumber: 'SN-MBP-M3-0001',
			appearanceCondition: 'Mới 100%',
			status: 'in_stock',
			importDate: '2026-02-20',
		},
		{
			id: 7,
			productId: 207,
			batchId: 3,
			productVariantId: 103,
			productVariantName: 'MacBook Pro M3',
			serialNumber: 'SN-MBP-M3-0002',
			appearanceCondition: 'Móp nhẹ góc',
			status: 'defective',
			importDate: '2026-02-20',
		},
		{
			id: 8,
			productId: 208,
			batchId: 4,
			productVariantId: 104,
			productVariantName: 'Sony WH-1000XM5',
			serialNumber: 'SN-SONY-XM5-0001',
			appearanceCondition: 'Mới 100%',
			status: 'in_stock',
			importDate: '2026-03-10',
			expiredAt: '2027-03-10',
		},
		{
			id: 9,
			productId: 209,
			batchId: 4,
			productVariantId: 104,
			productVariantName: 'Sony WH-1000XM5',
			serialNumber: 'SN-SONY-XM5-0002',
			appearanceCondition: 'Mới 100%',
			status: 'sold',
			importDate: '2026-03-10',
			expiredAt: '2027-03-10',
		},
		{
			id: 10,
			productId: 210,
			batchId: 5,
			productVariantId: 105,
			productVariantName: 'Logitech MX Master 3S',
			serialNumber: 'SN-LOGI-MX3S-0001',
			appearanceCondition: 'Mới 100%',
			status: 'in_stock',
			importDate: '2026-03-15',
		},
	];
};
