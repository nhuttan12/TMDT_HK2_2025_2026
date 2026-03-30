import { JSX } from 'react';
import CategoryAdminForm from '@/app/admin/categories/_components/category-admin-form';

interface Props {
	params: { categoryId: string };
}

export default function Index({ params }: Props): JSX.Element {
	return <CategoryAdminForm formType={'view'} />;
}
