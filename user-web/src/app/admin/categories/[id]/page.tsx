import { JSX } from 'react';
import CategoryAdminForm from '@/components/category/admin/category-admin-form';

interface Props {
	params: { categoryID: string };
}

export default function Index({params}: Props): JSX.Element {
	return <CategoryAdminForm formType={'view'}/>;
}
