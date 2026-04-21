'use client';

import { JSX } from 'react';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { CategoryAdminUi } from './category-admin-ui';
import { useCategoryAdminQuery } from '@/queries/categories/admin/use-category-admin-query';
import {
	CategoryAdminLogicReturn,
	useCategoryAdminLogic,
} from '@/hooks/categories/admin/use-category-admin-logic';

interface CategoryAdminContainerProps {
	initialCategories: CategoryListItemAdmin[];
}

export default function CategoryAdminContainer({
	initialCategories,
}: CategoryAdminContainerProps): JSX.Element {
	// 1. Fetch & Hydrate Data
	const { data: categories = [], isLoading } = useCategoryAdminQuery(initialCategories);

	// 2. Initialize Logic (Truyền categories vào để tính toán mảng selected keys)
	const logic: CategoryAdminLogicReturn = useCategoryAdminLogic(categories);

	// 3. Render UI
	return (
		<CategoryAdminUi
			categories={categories}
			isLoading={isLoading}
			{...logic}
		/>
	);
}
