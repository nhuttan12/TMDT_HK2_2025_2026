import { ProductForGoodsIssue } from '@/types/inventories/issues/uis/ProductForGoodsIssue';
import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';

export async function getProductsForIssue(): Promise<ProductForGoodsIssue[]> {
	return new Promise<ProductForGoodsIssue[]>((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 'c8e1467a-1234-4f01-a12b-variant00101', // Đồng bộ GUID cũ của Bể Kính Đa Giác Khung Đồng (Size L)
					name: 'Bể Kính Đa Giác Khung Đồng (Size L)',
					sku: 'GLS-POLY-L-01',
					serialNumber: 'SN-GLS-26-001A',
					status: true,
				},
				{
					id: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', // Tạo GUID mới cho Hệ Thống Phun Sương MistKing
					name: 'Hệ Thống Phun Sương Tự Động MistKing',
					sku: 'MIST-KING-V2',
					serialNumber: 'SN-MK-V2-992B',
					status: true,
				},
			]);
		}, 500);
	});
}

export async function submitGoodsIssueForm(
	data: GoodsIssueDetail,
	isCreate: boolean,
): Promise<void> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Giả lập thành công
			resolve();
		}, 1500);
	});
}

export async function getGoodsIssueById(id: string): Promise<GoodsIssueDetail> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', // Đã đổi sang GUID (Thay cho ID số 1 truyền vào)
				code: 'PXK-20260403-001',
				type: 'wholesale',
				partner: {
					id: 'e6a8b7c2-58cc-4b01-90e6-d701748f0851', // Đã đổi sang GUID
					name: 'Công ty TNHH Cảnh Quan Xanh (GreenScape)',
					type: 'customer',
					phoneNumber: '02838445566',
					address: '123 Đường Cây Kiểng, Phường Bình An, Quận 2, TP.HCM',
				},
				warehouseID: '7b233a01-5242-4f3b-8531-180a3a7800ab', // Đã đổi sang GUID
				createdBy: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // Đã đổi sang GUID (Tài khoản của nhân viên)
				createdByName: 'Phạm Nhựt Tân',
				exportDate: '2026-04-03T16:30:00.000Z',
				status: 'confirmed',
				note: 'Xuất vật tư thi công dự án vách ngăn Terrarium cho sảnh tòa nhà Vincom',
				items: [
					{
						id: 'e58ed763-928c-4155-bee9-fdbaaadc15f3', // Đã đổi sang GUID
						variantId: '550e8400-e29b-41d4-a716-446655440010', // Đã đổi sang GUID
						variantName: 'Bể Kính Chữ Nhật Ghép Keo Tàng Hình (100x40x40)',
						sku: 'TANK-RECT-100',
						quantity: 2,
						unitPrice: 1850000,
						totalPrice: 3700000,
						batchNumber: 'BATCH-GLS-0426',
						serialNumber: 'TANK-100-001, TANK-100-002',
						note: 'Hàng dễ vỡ, bọc xốp cẩn thận',
					},
					{
						id: 'bc7b2671-5085-40b9-a9a2-944a86f7df21', // Đã đổi sang GUID
						variantId: '550e8400-e29b-41d4-a716-446655440011', // Đã đổi sang GUID
						variantName: 'Đất Nền Trộn Sẵn Terrarium Soil (Bao 5kg)',
						sku: 'SOIL-TERRA-5KG',
						quantity: 5,
						unitPrice: 120000,
						totalPrice: 600000,
						batchNumber: 'BATCH-SOIL-0326',
						note: 'Hàng khô',
					},
					{
						id: 'fa4109bd-7589-4e78-bad4-10672ce893bc', // Đã đổi sang GUID
						variantId: '550e8400-e29b-41d4-a716-446655440012', // Đã đổi sang GUID
						variantName: 'Đèn LED Rọi Cây Quang Phổ Rộng 10W',
						sku: 'LED-SPOT-10W',
						quantity: 4,
						unitPrice: 250000,
						totalPrice: 1000000,
						batchNumber: 'BATCH-LED-0126',
						serialNumber: 'LED-099, LED-100, LED-101, LED-102',
					},
					{
						id: 'c8e1467a-1234-4f01-a12b-d32109876543', // Đã đổi sang GUID
						variantId: '550e8400-e29b-41d4-a716-446655440013', // Đã đổi sang GUID
						variantName: 'Rêu Đầu Rìu Mảng Lớn (Khay 20x20cm)',
						sku: 'MOSS-AXE-20',
						quantity: 10,
						unitPrice: 45000,
						totalPrice: 450000,
						batchNumber: 'BATCH-MOSS-0426',
						note: 'Hàng sống, cần giữ ẩm khi vận chuyển',
					},
					{
						id: 'a9b2345c-6789-4e21-b34c-f98765432109', // Đã đổi sang GUID
						variantId: '550e8400-e29b-41d4-a716-446655440014', // Đã đổi sang GUID
						variantName: 'Đá Tai Mèo Setup Tiểu Cảnh (Bao 10kg)',
						sku: 'STONE-CAT-10KG',
						quantity: 3,
						unitPrice: 150000,
						totalPrice: 450000,
						batchNumber: 'BATCH-STONE-0226',
					},
				],
				// Giữ nguyên kiểu number cho các trường tính toán tổng khối lượng tài sản
				totalQuantity: 24,
				totalAmount: 6200000,
				createdAt: '2026-04-03T08:00:00.000Z',
				updatedAt: '2026-04-03T09:30:00.000Z',
			});
		}, 500);
	});
}
