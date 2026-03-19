import { JSX } from 'react';
import ProductAdminClient from '@/app/admin/products/_components/product-admin-client';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { Metadata } from 'next';

const mockProducts: ProductListInfoAdmin[] = [
	{
		id: 1,
		name: 'iPhone 15 Pro Max 256GB',
		slug: 'iphone-15-pro-max-256gb',
		image: 'https://picsum.photos/seed/iphone15/400/400',
		salePrice: 34990000,
		status: true,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
	{
		id: 2,
		name: 'MacBook Air M3 13-inch',
		slug: 'macbook-air-m3-13-inch',
		image: 'https://picsum.photos/seed/macbookm3/400/400',
		salePrice: 28990000,
		status: true,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
	{
		id: 3,
		name: 'AirPods Pro 2',
		slug: 'airpods-pro-2',
		image: 'https://picsum.photos/seed/airpodspro2/400/400',
		salePrice: 5990000,
		status: false,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
	{
		id: 4,
		name: 'iPad Pro 11-inch M2',
		slug: 'ipad-pro-11-inch-m2',
		image: 'https://picsum.photos/seed/ipadpro/400/400',
		salePrice: 21990000,
		status: true,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
	{
		id: 5,
		name: 'Apple Watch Series 9',
		slug: 'apple-watch-series-9',
		image: 'https://picsum.photos/seed/applewatch9/400/400',
		salePrice: 10990000,
		status: false,
		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',
	},
];

export const metadata: Metadata = {
	title: 'Quản lý đơn mua',
};

export default function ProductsPage(): JSX.Element {
	return <ProductAdminClient products={mockProducts} />;
}
