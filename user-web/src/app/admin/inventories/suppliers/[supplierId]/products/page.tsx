import { JSX } from 'react';
import { Metadata } from 'next';
import SupplierProductContainer from '@/app/admin/inventories/suppliers/[supplierId]/products/_components/supplier-product-container';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { fetchProductBySupplierId } from '@/services/inventories/suppliers/goods-supplier-service';

interface SupplierProductsPageProps {
	params: {
		supplierId: string;
	};
}

export async function generateMetadata({ params }: SupplierProductsPageProps): Promise<Metadata> {
	return {
		title: `Quản lý sản phẩm | Nhà cung cấp #${params.supplierId}`,
		description: `Quản lý thông tin sản phẩm của nhà cung cấp #${params.supplierId}`,
	};
}

export default async function SupplierProductsPage({
	params,
}: SupplierProductsPageProps): Promise<JSX.Element> {
	// 1. Lấy ID từ URL và chuyển sang dạng số
	const supplierId: number = Number(params.supplierId);

	// 2. Fetch dữ liệu từ Server
	const supplierName = 'Công ty TNHH Nhập khẩu Vina'; // Ví dụ: await fetchSupplierName(supplierId);

	const products: ProductListInfoAdmin[] = await fetchProductBySupplierId(supplierId);

	// 3. Render Container và truyền Props xuống
	return (
		<SupplierProductContainer
			supplierId={supplierId}
			supplierName={supplierName}
			initialProducts={products}
		/>
	);
}
