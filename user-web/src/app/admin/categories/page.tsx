'use client';

import { JSX } from 'react';
import { CategoryAdmin } from '@/types/categories/admin/CategoryAdmin';
import CategoryAdminTable from '@/app/admin/categories/category-admin-table';

const mockCategories: CategoryAdmin[] = [
	{
		categoryID: 1,
		name: 'Điện thoại',
		slug: 'dien-thoai',
		productCount: 120,
		isActive: true,
		createdAt: '2024-01-01T08:00:00Z',
		updatedAt: '2024-02-10T10:30:00Z',
	},
	{
		categoryID: 2,
		name: 'Laptop',
		slug: 'laptop',
		productCount: 85,
		isActive: true,
		createdAt: '2024-01-05T09:15:00Z',
		updatedAt: '2024-02-08T14:20:00Z',
	},
	{
		categoryID: 3,
		name: 'Phụ kiện',
		slug: 'phu-kien',
		productCount: 0,
		isActive: false,
		createdAt: '2024-02-01T11:00:00Z',
		updatedAt: '2024-02-12T16:45:00Z',
	},
];

export default function CategoriesPage(): JSX.Element {
	return <CategoryAdminTable categories={mockCategories} />;
}
