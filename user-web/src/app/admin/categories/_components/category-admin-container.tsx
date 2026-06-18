'use client';

import { JSX } from 'react';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { CategoryAdminUi } from './category-admin-ui';
import { useCategoryAdminQuery } from '@/queries/categories/admin/use-category-admin-query';
import {
	CategoryAdminLogicReturn,
	useCategoryAdminLogic,
} from '@/hooks/categories/admin/use-category-admin-logic';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

interface CategoryAdminContainerProps {
	initialCategories: PaginationResponse<CategoryListItemAdmin>;
}

export default function CategoryAdminContainer({
	initialCategories,
}: CategoryAdminContainerProps): JSX.Element {
	// 1. Fetch & Hydrate Data
	const { data, isLoading } = useCategoryAdminQuery(initialCategories);

	// 2. Initialize Logic (Truyền categories vào để tính toán mảng selected keys)
	const logic = useCategoryAdminLogic(data?.data || []);

	// 3. Render UI
	return (
		<CategoryAdminUi
			categories={data?.data || []}
			isLoading={isLoading}
			{...logic}
		/>
	);
}
