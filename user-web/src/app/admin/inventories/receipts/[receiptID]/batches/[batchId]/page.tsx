import { JSX } from 'react';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { Metadata } from 'next';
import ProductVariantListInBatchContainer from '@/app/admin/inventories/receipts/[receiptId]/batches/[batchId]/_components/product-variant-list-in-batch-container';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Sản phẩm trong lô hàng',
};

const mockBatchItemSerials: BatchItemSerial[] = [
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

interface Props {
	params: {
		batchId: string;
	};
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const { batchId } = await params;

	const id: number = Number(batchId);

	if (!id || Number.isNaN(id)) {
		console.error('Invalid batch ID', id);

		notFound();
	}

	return (
		<ProductVariantListInBatchContainer
			batchId={id}
			productVariants={mockBatchItemSerials}
			mode={'view'}
		/>
	);
}
