'use client';

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type SortOrder = 'asc' | 'desc';

export function useTableSort<T extends string>() {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const sortField = searchParams.get('sort') as T | null;
	const sortOrder = (searchParams.get('order') as SortOrder) ?? 'asc';

	const handleSort = (field: T) => {
		const currentSort: string | null = searchParams.get('sort');
		const currentOrder: string | null = searchParams.get('order');

		let newOrder: SortOrder = 'asc';

		if (currentSort === field) {
			newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
		}

		const params = new URLSearchParams(searchParams.toString());

		params.set('sort', field);
		params.set('order', newOrder);

		router.push(`?${params.toString()}`);
	};

	return {
		sortField,
		sortOrder,
		handleSort,
	};
}