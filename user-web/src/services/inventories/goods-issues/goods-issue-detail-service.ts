import { ProductForGoodsIssue } from '@/types/inventories/issues/uis/ProductForGoodsIssue';
import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';

export async function getProductsForIssue(): Promise<ProductForGoodsIssue[]> {
	return new Promise<ProductForGoodsIssue[]>((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					name: 'Bể Kính Đa Giác Khung Đồng (Size L)',
					sku: 'GLS-POLY-L-01',
					serialNumber: 'SN-GLS-26-001A',
					status: true,
				},
				{
					id: 2,
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

export async function getGoodsIssueById(id: number): Promise<GoodsIssueDetail> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: id, // Lấy theo ID truyền vào
				code: 'PXK-20260403-001',
				type: 'wholesale',
				partner: {
					id: 50,
					name: 'Công ty TNHH Cảnh Quan Xanh (GreenScape)',
					type: 'customer',
					phoneNumber: '02838445566',
					address: '123 Đường Cây Kiểng, Phường Bình An, Quận 2, TP.HCM',
				},
				warehouseID: 1,
				createdBy: 77,
				createdByName: 'Phạm Nhựt Tân',
				exportDate: '2026-04-03T16:30:00.000Z',
				status: 'confirmed',
				note: 'Xuất vật tư thi công dự án vách ngăn Terrarium cho sảnh tòa nhà Vincom',
				items: [
					{
						id: 101,
						productId: 10,
						productName: 'Bể Kính Chữ Nhật Ghép Keo Tàng Hình (100x40x40)',
						sku: 'TANK-RECT-100',
						quantity: 2,
						unitPrice: 1850000,
						totalPrice: 3700000,
						batchNumber: 'BATCH-GLS-0426',
						serialNumber: 'TANK-100-001, TANK-100-002',
						note: 'Hàng dễ vỡ, bọc xốp cẩn thận',
					},
					{
						id: 102,
						productId: 11,
						productName: 'Đất Nền Trộn Sẵn Terrarium Soil (Bao 5kg)',
						sku: 'SOIL-TERRA-5KG',
						quantity: 5,
						unitPrice: 120000,
						totalPrice: 600000,
						batchNumber: 'BATCH-SOIL-0326',
						note: 'Hàng khô',
					},
					{
						id: 103,
						productId: 12,
						productName: 'Đèn LED Rọi Cây Quang Phổ Rộng 10W',
						sku: 'LED-SPOT-10W',
						quantity: 4,
						unitPrice: 250000,
						totalPrice: 1000000,
						batchNumber: 'BATCH-LED-0126',
						serialNumber: 'LED-099, LED-100, LED-101, LED-102',
					},
					{
						id: 104,
						productId: 13,
						productName: 'Rêu Đầu Rìu Mảng Lớn (Khay 20x20cm)',
						sku: 'MOSS-AXE-20',
						quantity: 10,
						unitPrice: 45000,
						totalPrice: 450000,
						batchNumber: 'BATCH-MOSS-0426',
						note: 'Hàng sống, cần giữ ẩm khi vận chuyển',
					},
					{
						id: 105,
						productId: 14,
						productName: 'Đá Tai Mèo Setup Tiểu Cảnh (Bao 10kg)',
						sku: 'STONE-CAT-10KG',
						quantity: 3,
						unitPrice: 150000,
						totalPrice: 450000,
						batchNumber: 'BATCH-STONE-0226',
					},
				],
				// Tổng số lượng (2 + 5 + 4 + 10 + 3 = 24)
				totalQuantity: 24,
				// Tổng tiền (3700k + 600k + 1000k + 450k + 450k = 6,200,000)
				totalAmount: 6200000,
				createdAt: '2026-04-03T08:00:00.000Z',
				updatedAt: '2026-04-03T09:30:00.000Z',
			});
		}, 500);
	});
}
