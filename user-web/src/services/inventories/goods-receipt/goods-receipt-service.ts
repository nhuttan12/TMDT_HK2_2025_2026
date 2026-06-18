import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';

export const getGoodsReceipts = async (): Promise<GoodsReceiptList[]> => {
	// Giả lập delay mạng
	await new Promise((resolve) => setTimeout(resolve, 500));

	return [
		{
			id: '1a2b3c4d-1111-4aaa-8bbb-111111111111', // Đã chuyển sang GUID string
			code: 'PNK-20260321-001',
			supplierName: 'Công ty TNHH ABC',
			importDate: new Date('2026-03-21T09:00:00Z').toISOString(),
			totalBatches: 3, // Có 3 lô hàng khác nhau trong phiếu này
			totalQuantity: 15, // Tổng cộng 15 chiếc điện thoại
			totalAmount: 350000000, // 350 triệu VNĐ
			status: 'completed',
			createdAt: new Date('2026-03-21T08:30:00Z').toISOString(),
		},
		{
			id: '2b3c4d5e-2222-4aaa-8bbb-222222222222', // Đã chuyển sang GUID string
			code: 'PNK-20260324-002',
			supplierName: 'Nhà phân phối XYZ',
			importDate: new Date('2026-03-24T14:00:00Z').toISOString(),
			totalBatches: 1, // Chỉ nhập 1 lô duy nhất
			totalQuantity: 50, // Nhưng số lượng trong lô rất lớn
			totalAmount: 1250000000, // 1 tỷ 250 triệu VNĐ
			status: 'completed',
			createdAt: new Date('2026-03-24T10:15:00Z').toISOString(),
		},
		{
			id: '3c4d5e6f-3333-4aaa-8bbb-333333333333', // Đã chuyển sang GUID string
			code: 'PNK-20260325-003',
			supplierName: 'Apple Vietnam',
			importDate: new Date('2026-03-25T16:30:00Z').toISOString(),
			totalBatches: 5,
			totalQuantity: 100,
			totalAmount: 2500000000,
			status: 'completed',
			createdAt: new Date('2026-03-25T11:00:00Z').toISOString(),
		},
	];
};
