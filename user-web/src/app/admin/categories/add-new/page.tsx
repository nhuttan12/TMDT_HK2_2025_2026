import { JSX } from 'react';
import CategoryAdminForm from '@/components/category/admin/category-admin-form';

export default function AddNewProductPage(): JSX.Element {
	return <CategoryAdminForm formType='create' />;
}
