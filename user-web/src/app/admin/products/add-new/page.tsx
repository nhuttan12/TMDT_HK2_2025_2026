import { JSX } from 'react';
import ProductAdminForm from '@/components/product/admin/product-admin-form';

export default function AddNewProductPage(): JSX.Element {
	return <ProductAdminForm formType='create' />;
}
