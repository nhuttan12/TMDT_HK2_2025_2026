import { JSX } from 'react';
import ProductAdminForm from '@/components/product/admin/product-admin-form';

interface Props {
	params: { productID: string };
}

export default function Index({ params }: Props): JSX.Element {
	return <ProductAdminForm key={'view'} formType={'view'} />;
}
