import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';

export const getGoodsReceipts = async (): Promise<GoodsReceiptList[]> => {
	// Giả lập delay mạng
	await new Promise((resolve) => setTimeout(resolve, 500));

	return [
		{
			id: 1,
			code: 'PNK-20260321-001',
			supplierName: 'Công ty TNHH ABC',
			importDate: new Date('2026-03-21T09:00:00Z').toISOString(),
			totalBatches: 3, // Có 3 lô hàng khác nhau trong phiếu này
			totalQuantity: 15, // Tổng cộng 15 chiếc điện thoại
			totalAmount: 350000000, // 350 triệu VNĐ
			status: 'draft',
			createdAt: new Date('2026-03-21T08:30:00Z').toISOString(),
		},
		{
			id: 2,
			code: 'PNK-20260324-002',
			supplierName: 'Nhà phân phối XYZ',
			importDate: new Date('2026-03-24T14:00:00Z').toISOString(),
			totalBatches: 1, // Chỉ nhập 1 lô duy nhất
			totalQuantity: 50, // Nhưng số lượng trong lô rất lớn
			totalAmount: 1250000000, // 1 tỷ 250 triệu VNĐ
			status: 'confirmed',
			createdAt: new Date('2026-03-24T10:15:00Z').toISOString(),
		},
		{
			id: 3,
			code: 'PNK-20260325-003',
			supplierName: 'Apple Vietnam',
			importDate: new Date('2026-03-25T16:30:00Z').toISOString(),
			totalBatches: 5,
			totalQuantity: 100,
			totalAmount: 2500000000,
			status: 'cancelled',
			createdAt: new Date('2026-03-25T11:00:00Z').toISOString(),
		},
	];
};
