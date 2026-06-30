import { PaginationParams } from '@/types/common/Pagination';
import { Metadata } from 'next';
import { JSX } from 'react';
import ShopsListContainer from './_components/shop-list-container';

export const metadata: Metadata = {
	title: 'Danh sách cửa hàng',
};

export default async function ProductsPage(): Promise<JSX.Element> {
	const pageRequest: PaginationParams = {
		pageSize: 12,
		pageNumber: 1,
	};
	// const products = await getProductFilter({}, pageRequest);

	return <ShopsListContainer />;
}
