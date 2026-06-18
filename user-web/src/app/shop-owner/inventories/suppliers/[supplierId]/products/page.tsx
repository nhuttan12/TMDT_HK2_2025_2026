import ProductAdminContainer from '@/components/products/admin/product-admin-container';
import { getProductBySupplierId } from '@/services/inventories/suppliers/goods-supplier-service';
import { Metadata } from 'next';
import { JSX } from 'react';

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
	const supplierId = params.supplierId;

	// 2. Fetch dữ liệu từ Server
	const supplierName = 'Công ty TNHH Nhập khẩu Vina'; // Ví dụ: await fetchSupplierName(supplierId);

	const products = await getProductBySupplierId(supplierId);

	// 3. Render Container và truyền Props xuống
	return (
		<ProductAdminContainer
			initialProducts={products}
			role={'shop-owner'}
		/>
	);
}
