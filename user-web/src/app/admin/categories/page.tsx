'use client';

import { JSX } from 'react';
import { CategoryAdmin } from '@/types/categories/admin/CategoryAdmin';
import CategoryAdminTable from '@/app/admin/categories/_components/category-admin-table';

const mockCategories: CategoryAdmin[] = [
	{
		categoryID: 1,
		name: 'Điện thoại',
		slug: 'dien-thoai',
		image: 'https://crdms.images.consumerreports.org/prod/products/cr/models/399694-smartphones-apple-iphone-11-10008711.png',
		productCount: 120,
		isActive: true,
		createdAt: '2024-01-01T08:00:00Z',
		updatedAt: '2024-02-10T10:30:00Z',
	},
	{
		categoryID: 2,
		name: 'Laptop',
		slug: 'laptop',
		image: 'https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopstopicpage-2048px-3685-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp',
		productCount: 85,
		isActive: true,
		createdAt: '2024-01-05T09:15:00Z',
		updatedAt: '2024-02-08T14:20:00Z',
	},
	{
		categoryID: 3,
		name: 'Phụ kiện',
		slug: 'phu-kien',
		image: 'https://i.ytimg.com/vi/xq7Z5fXpKL8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBG994a2YhKIUsCAqBy9oGKQxCUPw',
		productCount: 0,
		isActive: false,
		createdAt: '2024-02-01T11:00:00Z',
		updatedAt: '2024-02-12T16:45:00Z',
	},
];

export default function CategoriesPage(): JSX.Element {
	return <CategoryAdminTable categories={mockCategories} />;
}
