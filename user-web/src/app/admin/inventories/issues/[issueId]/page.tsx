import { JSX } from 'react';
import { Metadata } from 'next';
import GoodsIssueDetailContainer from '@/app/admin/inventories/issues/_components/goods-issue-detail-container';
import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';

export const metadata: Metadata = {
	title: 'Thông tin chi tiết hoá đơn xuất kho',
};

const mockGoodsIssueItems: GoodsIssueDetail = {
	id: 1,
	code: 'PXK-20260403-001',
	type: 'wholesale', // Loại bán sỉ
	partner: {
		id: 50,
		name: 'Công ty Công nghệ số ABC',
		type: 'customer',
		phoneNumber: '02838445566',
		address: '123 Đường số 7, Phường Linh Trung, Thủ Đức, TP.HCM',
	},
	warehouseID: 1, // Kho tổng
	createdBy: 77,
	createdByName: 'Phạm Nhựt Tân',
	exportDate: '2026-04-03T16:30:00.000Z',
	status: 'confirmed',
	note: 'Xuất hàng cho hợp đồng cung cấp thiết bị văn phòng quý 2/2026',
	items: [
		{
			id: 101,
			productId: 10,
			productName: 'Laptop Acer Nitro 5 Tiger 2022',
			sku: 'ACR-NTR5-2022-01',
			quantity: 2,
			unitPrice: 18500000,
			totalPrice: 37000000,
			batchNumber: 'BATCH-2026-001',
			serialNumber: 'SN-ACR-001, SN-ACR-002',
			note: 'Hàng kiểm định loại A',
		},
		{
			id: 102,
			productId: 11,
			productName: 'Chuột Gaming Logitech G502 Hero',
			sku: 'LOG-G502-H',
			quantity: 5,
			unitPrice: 1200000,
			totalPrice: 6000000,
			batchNumber: 'BATCH-2026-005',
			note: 'Tặng kèm lót chuột',
		},
		{
			id: 103,
			productId: 12,
			productName: 'Bàn phím cơ Akko 3087 DS V2',
			sku: 'AKKO-3087-DS',
			quantity: 3,
			unitPrice: 1550000,
			totalPrice: 4650000,
			batchNumber: 'BATCH-2026-005',
			serialNumber: 'AK-099, AK-100, AK-101',
		},
		{
			id: 104,
			productId: 13,
			productName: 'Màn hình Dell UltraSharp U2422H',
			sku: 'DELL-U2422H',
			quantity: 2,
			unitPrice: 6800000,
			totalPrice: 13600000,
			batchNumber: 'BATCH-2026-002',
			serialNumber: 'DELL-US-9981, DELL-US-9982',
		},
		{
			id: 105,
			productId: 14,
			productName: 'Tai nghe HyperX Cloud II Wireless',
			sku: 'HPX-C2-WL',
			quantity: 4,
			unitPrice: 3200000,
			totalPrice: 12800000,
			batchNumber: 'BATCH-2026-010',
		},
	],
	totalQuantity: 100000,
	totalAmount: 20000,
	createdAt: '2026-04-03T08:00:00.000Z',
	updatedAt: '2026-04-03T09:30:00.000Z',
};

export default function GoodsIssuePage(): JSX.Element {
	return (
		<GoodsIssueDetailContainer
			formType={'view'}
			goodsIssue={mockGoodsIssueItems}
		/>
	);
}
