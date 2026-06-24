import { BatchItem } from '@/types/inventories/receipts/uis/BatchItem';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';

export const getGoodsReceiptDetailByReceiptId = async (id: string): Promise<GoodsReceiptDetail> => {
	// Giả lập network delay để test UX loading sau này
	await new Promise((resolve) => setTimeout(resolve, 300));

	const now = Date.now();

	// Trả về mock data
	return {
		id: id, // Tham số id truyền vào vốn đã là chuỗi GUID
		code: 'PNK-20260601-001', // Sửa lại mã code tĩnh hợp lý thay vì nối chuỗi GUID
		supplierID: 'e6a8b7c2-58cc-4b01-90e6-d701748f0851', // Đã chuyển sang GUID string
		supplierName: 'Xưởng Thủy Tinh GreenLife',
		importDate: new Date(now).toISOString(),
		importStatus: 'completed',
		note: 'Nhập hàng vật tư bể và đèn LED đầu tháng',
		batches: [
			{
				id: '1a2b3c4d-1111-4aaa-8bbb-111111111111', // Chuyển sang GUID string
				productId: '550e8400-e29b-41d4-a716-446655440101', // Chuyển sang GUID string
				productName: 'Bể Kính Đa Giác (Size L)',
				batchNumber: 'BATCH-GLS-001',
				quantity: 10,
				totalPrice: 15000000,
			},
			{
				id: '2b3c4d5e-2222-4aaa-8bbb-222222222222', // Chuyển sang GUID string
				productId: '550e8400-e29b-41d4-a716-446655440102', // Chuyển sang GUID string
				productName: 'Đèn LED Quang Phổ Rộng 15W',
				batchNumber: 'BATCH-LED-002',
				quantity: 5,
				totalPrice: 1750000,
			},
		],
	};
};

export const getProductListInBatch = async (
	batchId: string,
	receiptId: string,
): Promise<BatchItem[]> => {
	// Giả lập network delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	return [
		{
			id: '1a2b3c4d-1111-4aaa-8bbb-111111111111', // GUID cho bản ghi định danh serial
			productId: '550e8400-e29b-41d4-a716-446655440201', // GUID của sản phẩm
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000001', // GUID của Lô hàng 1
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00101', // GUID của Biến thể 101
			productVariantName: 'Bể Kính Đa Giác Khung Đồng (Size L)',
			costPrice: 900000,
		},
		{
			id: '2b3c4d5e-2222-4aaa-8bbb-222222222222',
			productId: '550e8400-e29b-41d4-a716-446655440202',
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000001', // Cùng lô 1
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00101', // Cùng biến thể 101
			productVariantName: 'Bể Kính Đa Giác Khung Đồng (Size L)',
			costPrice: 800000,
		},
		{
			id: '3c4d5e6f-3333-4aaa-8bbb-333333333333',
			productId: '550e8400-e29b-41d4-a716-446655440203',
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000001', // Cùng lô 1
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00101', // Cùng biến thể 101
			productVariantName: 'Bể Kính Đa Giác Khung Đồng (Size L)',
			costPrice: 700000,
		},
		{
			id: '4d5e6f7a-4444-4aaa-8bbb-444444444444',
			productId: '550e8400-e29b-41d4-a716-446655440204',
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000002', // Lô 2
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00102', // Biến thể 102
			productVariantName: 'Đèn LED Quang Phổ Rộng 15W',
			costPrice: 800000,
		},
		{
			id: '5e6f7a8b-5555-4aaa-8bbb-555555555555',
			productId: '550e8400-e29b-41d4-a716-446655440205',
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000002', // Lô 2
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00102', // Biến thể 102
			productVariantName: 'Đèn LED Quang Phổ Rộng 15W',
			costPrice: 600000,
		},
		{
			id: '6f7a8b9c-6666-4aaa-8bbb-666666666666',
			productId: '550e8400-e29b-41d4-a716-446655440206',
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000003', // Lô 3
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00103', // Biến thể 103
			productVariantName: 'Hệ Thống Phun Sương Mini Tự Động',
			costPrice: 500000,
		},
		{
			id: '7a8b9c0d-7777-4aaa-8bbb-777777777777',
			productId: '550e8400-e29b-41d4-a716-446655440207',
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000003', // Lô 3
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00103', // Biến thể 103
			productVariantName: 'Hệ Thống Phun Sương Mini Tự Động',
			costPrice: 700000,
		},
		{
			id: '8b9c0d1e-8888-4aaa-8bbb-888888888888',
			productId: '550e8400-e29b-41d4-a716-446655440208',
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000004', // Lô 4
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00104', // Biến thể 104
			productVariantName: 'Quạt Tản Nhiệt Bể Terrarium 5V',
			costPrice: 1000000,
		},
		{
			id: '9c0d1e2f-9999-4aaa-8bbb-999999999999',
			productId: '550e8400-e29b-41d4-a716-446655440209',
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000004', // Lô 4
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00104', // Biến thể 104
			productVariantName: 'Quạt Tản Nhiệt Bể Terrarium 5V',
			costPrice: 600000,
		},
		{
			id: '0d1e2f3a-0000-4aaa-8bbb-000000000000',
			productId: '550e8400-e29b-41d4-a716-446655440210',
			batchId: 'e6a8b7c2-58cc-4b01-90e6-batch0000005', // Lô 5
			productVariantId: 'c8e1467a-1234-4f01-a12b-variant00105', // Biến thể 105
			productVariantName: 'Bộ Kéo Tỉa Terrarium Thép Không Gỉ 3 Món',
			costPrice: 500000,
		},
	];
};
