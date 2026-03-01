import { JSX } from 'react';
import ProductAdminForm from '@/components/admin/product-admin-form';

export default function AddNewProductPage(): JSX.Element {
	return <ProductAdminForm formType='add new' />;
}
