import apiServer from '@/lib/api-server';
import { GoodsSupplierService } from '@/services/inventories/suppliers/goods-supplier-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import SupplierFormContainer from './_components/supplier-form-container';

interface SupplierProductsPageProps {
	params: Promise<{
		supplierId: string;
	}>;
}

export async function generateMetadata({ params }: SupplierProductsPageProps): Promise<Metadata> {
	const { supplierId } = await params;
    return {
		title: 'Chỉnh sửa thông tin nhà cung cấp',
	};
}

export default async function SupplierProductsPage({
	params,
}: SupplierProductsPageProps): Promise<JSX.Element> {
    const { supplierId } = await params;

    const goodsSupplierService = new GoodsSupplierService(apiServer);

	const supplier = await goodsSupplierService.getSupplierDetailBySupplierId(supplierId);

	// 3. Render Container và truyền Props xuống
	return (
		<SupplierFormContainer
			supplier={supplier}
			mode={'update'}
		/>
	);
}
