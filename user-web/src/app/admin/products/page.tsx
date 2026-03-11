import { JSX } from 'react';
import ProductAdminTable from '@/app/admin/products/_components/product-admin-table';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import {
	ProductAdminSortField,
	ProductAdminSortOrder,
} from '@/types/products/admin/ProductAdminSort';

const mockProducts: ProductListInfoAdmin[] = [
	{
		productID: 1,
		name: 'iPhone 15 Pro Max 256GB',
		slug: 'iphone-15-pro-max-256gb',
		image: 'https://picsum.photos/seed/iphone15/400/400',
		price: 34990000,
		stock: 12,
		status: true,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
	{
		productID: 2,
		name: 'MacBook Air M3 13-inch',
		slug: 'macbook-air-m3-13-inch',
		image: 'https://picsum.photos/seed/macbookm3/400/400',
		price: 28990000,
		stock: 5,
		status: true,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
	{
		productID: 3,
		name: 'AirPods Pro 2',
		slug: 'airpods-pro-2',
		image: 'https://picsum.photos/seed/airpodspro2/400/400',
		price: 5990000,
		stock: 0,
		status: false,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
	{
		productID: 4,
		name: 'iPad Pro 11-inch M2',
		slug: 'ipad-pro-11-inch-m2',
		image: 'https://picsum.photos/seed/ipadpro/400/400',
		price: 21990000,
		stock: 7,
		status: true,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
	{
		productID: 5,
		name: 'Apple Watch Series 9',
		slug: 'apple-watch-series-9',
		image: 'https://picsum.photos/seed/applewatch9/400/400',
		price: 10990000,
		stock: 3,
		status: false,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
];

interface Props {
	searchParams: {
		sort?: string;
		order?: string;
		page?: string;
	};
}

export default function ProductsPage({ searchParams }: Props): JSX.Element {
	const sort: string = searchParams.sort ?? 'createdAt';
	const order: string = searchParams.order ?? 'desc';

	return (
		<ProductAdminTable
			products={mockProducts}
			sortField={sort as ProductAdminSortField}
			sortOrder={order as ProductAdminSortOrder}
		/>
	);
}
