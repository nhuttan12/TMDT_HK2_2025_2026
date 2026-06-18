import { JSX } from 'react';
import { Metadata } from 'next';
import { getSupplierDetailBySupplierId } from '@/services/inventories/suppliers/goods-supplier-service';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import SupplierFormContainer from './_components/supplier-form-container';

interface SupplierProductsPageProps {
	params: {
		supplierId: string;
	};
}

export async function generateMetadata({ params }: SupplierProductsPageProps): Promise<Metadata> {
	return {
		title: 'Chỉnh sửa thông tin nhà cung cấp',
	};
}

export default async function SupplierProductsPage({
	params,
}: SupplierProductsPageProps): Promise<JSX.Element> {
	// 1. Lấy ID từ URL và chuyển sang dạng số
	const supplierId = params.supplierId;

	// 2. Fetch dữ liệu từ Server
	const supplierName = 'Công ty TNHH Nhập khẩu Vina'; // Ví dụ: await fetchSupplierName(supplierId);

	const supplier: Supplier = await getSupplierDetailBySupplierId(supplierId);

	// 3. Render Container và truyền Props xuống
	return (
		<SupplierFormContainer
			supplier={supplier}
			mode={'update'}
		/>
	);
}
