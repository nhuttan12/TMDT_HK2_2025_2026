import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';

const ONE_DAY_MS = 86400000;

export const getGoodsReceiptById = async (id: number): Promise<GoodsReceiptDetail> => {
	// Giả lập network delay để test UX loading sau này
	await new Promise((resolve) => setTimeout(resolve, 300));

	const now = Date.now();

	// Trả về mock data
	return {
		id: id,
		code: `PNK-00${id}`,
		supplierID: 1,
		supplierName: 'Xưởng Thủy Tinh GreenLife',
		importDate: new Date(now).toISOString(),
		importStatus: 'draft',
		note: 'Nhập hàng vật tư bể và đèn LED đầu tháng',
		batches: [
			{
				id: 1,
				productId: 101,
				productName: 'Bể Kính Đa Giác (Size L)',
				batchNumber: 'BATCH-GLS-001',
				quantity: 10,
				totalPrice: 15000000,
				manufacturedAt: new Date(now - 90 * ONE_DAY_MS).toISOString(),
				expiredAt: new Date(now + 365 * ONE_DAY_MS).toISOString(),
			},
			{
				id: 2,
				productId: 102,
				productName: 'Đèn LED Quang Phổ Rộng 15W',
				batchNumber: 'BATCH-LED-002',
				quantity: 5,
				totalPrice: 1750000,
				manufacturedAt: new Date(now - 30 * ONE_DAY_MS).toISOString(),
				expiredAt: new Date(now + 730 * ONE_DAY_MS).toISOString(),
			},
		],
	};
};

export const getProductListInBatch = async (): Promise<BatchItemSerial[]> => {
	const now = Date.now();

	// Giả lập network delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	return [
		{
			id: 1,
			productId: 201,
			batchId: 1,
			productVariantId: 101,
			productVariantName: 'Bể Kính Đa Giác Khung Đồng (Size L)',
			serialNumber: 'SN-GLS-0001',
			costPrice: 900000,
			appearanceCondition: 'Mới 100%, nguyên vẹn',
			status: 'in_stock',
			importDate: new Date(now - 60 * ONE_DAY_MS).toISOString(),
			expiredAt: undefined,
		},
		{
			id: 2,
			productId: 202,
			batchId: 1,
			productVariantId: 101,
			productVariantName: 'Bể Kính Đa Giác Khung Đồng (Size L)',
			serialNumber: 'SN-GLS-0002',
			costPrice: 800000,
			appearanceCondition: 'Mới 100%, nguyên vẹn',
			status: 'sold',
			importDate: new Date(now - 60 * ONE_DAY_MS).toISOString(),
		},
		{
			id: 3,
			productId: 203,
			batchId: 1,
			productVariantId: 101,
			productVariantName: 'Bể Kính Đa Giác Khung Đồng (Size L)',
			serialNumber: 'SN-GLS-0003',
			costPrice: 700000,
			appearanceCondition: 'Nứt nhẹ góc đáy',
			status: 'defective',
			importDate: new Date(now - 60 * ONE_DAY_MS).toISOString(),
		},
		{
			id: 4,
			productId: 204,
			batchId: 2,
			productVariantId: 102,
			productVariantName: 'Đèn LED Quang Phổ Rộng 15W',
			serialNumber: 'SN-LED-0001',
			costPrice: 800000,
			appearanceCondition: 'Mới 100%',
			status: 'in_stock',
			importDate: new Date(now - 50 * ONE_DAY_MS).toISOString(),
		},
		{
			id: 5,
			productId: 205,
			batchId: 2,
			productVariantId: 102,
			productVariantName: 'Đèn LED Quang Phổ Rộng 15W',
			serialNumber: 'SN-LED-0002',
			costPrice: 600000,
			appearanceCondition: 'Mới 100%',
			status: 'sold',
			importDate: new Date(now - 50 * ONE_DAY_MS).toISOString(),
		},
		{
			id: 6,
			productId: 206,
			batchId: 3,
			productVariantId: 103,
			productVariantName: 'Hệ Thống Phun Sương Mini Tự Động',
			serialNumber: 'SN-MIST-0001',
			costPrice: 500000,
			appearanceCondition: 'Mới 100%',
			status: 'in_stock',
			importDate: new Date(now - 80 * ONE_DAY_MS).toISOString(),
		},
		{
			id: 7,
			productId: 207,
			batchId: 3,
			productVariantId: 103,
			productVariantName: 'Hệ Thống Phun Sương Mini Tự Động',
			serialNumber: 'SN-MIST-0002',
			costPrice: 700000,
			appearanceCondition: 'Móp hộp, nứt ống dẫn nước',
			status: 'defective',
			importDate: new Date(now - 80 * ONE_DAY_MS).toISOString(),
		},
		{
			id: 8,
			productId: 208,
			batchId: 4,
			productVariantId: 104,
			productVariantName: 'Quạt Tản Nhiệt Bể Terrarium 5V',
			serialNumber: 'SN-FAN-0001',
			costPrice: 1000000,
			appearanceCondition: 'Mới 100%',
			status: 'in_stock',
			importDate: new Date(now - 30 * ONE_DAY_MS).toISOString(),
			expiredAt: new Date(now + 330 * ONE_DAY_MS).toISOString(),
		},
		{
			id: 9,
			productId: 209,
			batchId: 4,
			productVariantId: 104,
			productVariantName: 'Quạt Tản Nhiệt Bể Terrarium 5V',
			serialNumber: 'SN-FAN-0002',
			costPrice: 600000,
			appearanceCondition: 'Mới 100%',
			status: 'sold',
			importDate: new Date(now - 30 * ONE_DAY_MS).toISOString(),
			expiredAt: new Date(now + 330 * ONE_DAY_MS).toISOString(),
		},
		{
			id: 10,
			productId: 210,
			batchId: 5,
			productVariantId: 105,
			productVariantName: 'Bộ Kéo Tỉa Terrarium Thép Không Gỉ 3 Món',
			serialNumber: 'SN-TOOL-0001',
			costPrice: 500000,
			appearanceCondition: 'Mới 100%',
			status: 'in_stock',
			importDate: new Date(now - 15 * ONE_DAY_MS).toISOString(),
		},
	];
};
