import { Supplier } from "@/types/inventories/suppliers/Supplier";
import { Metadata } from "next";
import { JSX } from "react";
import SupplierFormContainer from "../[supplierId]/edit/_components/supplier-form-container";

export const metadata: Metadata = {
	title: 'Thêm nhà cung cấp mới',
};

export default async function SupplierProductsPage(): Promise<JSX.Element> {
	const supplier: Supplier = {
        address: '',
        id: '',
        name: '',
        taxCode: '',
        contactName: '',
        email: '',
        phone: '',
    }

	// 3. Render Container và truyền Props xuống
	return (
		<SupplierFormContainer
			supplier={supplier}
			mode={'create'}
		/>
	);
}
