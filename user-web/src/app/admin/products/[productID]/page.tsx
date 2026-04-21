import { JSX } from 'react';
import ProductAdminFormContainer from '@/app/admin/products/[productId]/_components/product-admin-form-container';
import { Metadata } from 'next';
import { ProductVariant } from '@/types/products/admin/variant/ProductVariant';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';

interface Props {
	params: { productId: string };
}

const mockProductVariant: ProductVariant[] = [
	{
		id: 1,
		productId: 201,
		name: 'iPhone 15 - 128GB - Black',
		sku: 'IP15-128-BLK',
		quantity: 12,
		costPrice: 18000000,
		salePrice: 21990000,
		image: 'data:image/jpeg;base64,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',
	},
	{
		id: 2,
		productId: 201,
		name: 'iPhone 15 - 256GB - Black',
		sku: 'IP15-256-BLK',
		quantity: 8,
		costPrice: 20000000,
		salePrice: 24990000,
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR97PWXn2cDIVwwkfDlRlUYhQsSrsvLq6WQ_g&s',
	},
	{
		id: 3,
		productId: 201,
		name: 'iPhone 15 - 128GB - Pink',
		sku: 'IP15-128-PNK',
		quantity: 10,
		costPrice: 18000000,
		salePrice: 21990000,
		image: 'data:image/jpeg;base64,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',
	},
	{
		id: 4,
		productId: 202,
		name: 'Samsung Galaxy S24 - 256GB - Black',
		sku: 'S24-256-BLK',
		quantity: 15,
		costPrice: 17000000,
		salePrice: 20990000,
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQelja7sLvp5EcWn2IDEQUJ7Xve5eW_bwW37w&s',
	},
	{
		id: 5,
		productId: 202,
		name: 'Samsung Galaxy S24 - 512GB - Black',
		sku: 'S24-512-BLK',
		quantity: 6,
		costPrice: 19000000,
		salePrice: 23990000,
		image: 'https://bvtmobile.com/uploads/source/s24fe/24fe..png',
	},
	{
		id: 6,
		productId: 202,
		name: 'Samsung Galaxy S24 - 256GB - Purple',
		sku: 'S24-256-PRP',
		quantity: 9,
		costPrice: 17000000,
		salePrice: 20990000,
		image: 'https://image.anhducdigital.vn/di-dong/dien-thoai/samsung/samsung-galaxy-s24-plus/samsung-galaxy-s24-plus-01-500x500.jpg',
	},
	{
		id: 7,
		productId: 203,
		name: 'Xiaomi 14 - 256GB - White',
		sku: 'XM14-256-WHT',
		quantity: 20,
		costPrice: 12000000,
		salePrice: 14990000,
		image: 'https://cdn.tgdd.vn/Products/Images/42/322526/xiaomi-14-white-thumbnew-600x600.jpg',
	},
	{
		id: 8,
		productId: 203,
		name: 'Xiaomi 14 - 512GB - Black',
		sku: 'XM14-512-BLK',
		quantity: 14,
		costPrice: 14000000,
		salePrice: 17990000,
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWzzyBqmxgDG8ZgTLVgSrM-a1c7kj-QXuCCw&s',
	},
	{
		id: 9,
		productId: 204,
		name: 'OPPO Find X7 - 256GB - Blue',
		sku: 'OPX7-256-BLU',
		quantity: 11,
		costPrice: 13000000,
		salePrice: 16990000,
		image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/f/i/find_x7_1.png',
	},
	{
		id: 10,
		productId: 204,
		name: 'OPPO Find X7 - 512GB - Black',
		sku: 'OPX7-512-BLK',
		quantity: 7,
		costPrice: 15000000,
		salePrice: 19990000,
		image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/f/i/find_x7_1.png',
	},
];

const mockProductAdmin: ProductDetailInfoAdmin = {
	id: 1,
	name: 'iPhone 15 Pro Max 256GB',
	slug: 'iphone-15-pro-max-256gb',

	supplierName: 'Apple',

	description: 'Phiên bản cao cấp nhất của iPhone 15 series.',

	importPrice: 30000000,
	discount: calculateDiscount(34990000, 30000000),

	status: true,
	categoryId: 1,

	images: [
		{
			localId: crypto.randomUUID(),
			imageUrl:
				'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iphone_15/dien-thoai-iphone-15-pro-max-1.jpg',
			order: 0,
			isPrimary: true,
			status: 'done',
			progress: 100,
		},
		{
			localId: crypto.randomUUID(),
			imageUrl:
				'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iphone_15/dien-thoai-iphone-15-pro-max-2.jpg',
			order: 1,
			isPrimary: false,
			status: 'done',
			progress: 100,
		},
	],

	createdAt: '2024-01-10T10:00:00Z',
	updatedAt: '2024-02-01T15:30:00Z',
};

export const metadata: Metadata = {
	title: 'Quản lý thông tin chi tiết sản phẩm',
};

export default function Index({ params }: Props): JSX.Element {
	return (
		<ProductAdminFormContainer
			key={'view'}
			formType={'view'}
			productAdmin={mockProductAdmin}
			productVariants={mockProductVariant}
		/>
	);
}
