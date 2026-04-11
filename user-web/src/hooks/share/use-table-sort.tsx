'use client';

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { JSX, useTransition } from 'react';

type SortOrder = 'asc' | 'desc';

export function useTableSort<T extends string>() {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const sortField = searchParams.get('sort') as T | null;
	const sortOrder = (searchParams.get('order') as SortOrder) ?? 'asc';

	const handleSort = (field: T) => {
		const currentSort: string | null = searchParams.get('sort');
		const currentOrder: string | null = searchParams.get('order');

		let newOrder: SortOrder = 'asc';

		if (currentSort === field) {
			newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
		}

		// guard
		if (currentSort === field && currentOrder === newOrder) return;

		const params = new URLSearchParams(searchParams.toString());

		params.set('sort', field);
		params.set('order', newOrder);

		startTransition((): void => {
			router.push(`?${params.toString()}`, { scroll: false });
		});
	};

	const renderSortIcon = (field: T): JSX.Element | null => {
		if (sortField !== field) return null;

		if (sortOrder === 'asc') {
			return (
				<ChevronUp
					size={14}
					className='inline ml-1'
				/>
			);
		}

		return (
			<ChevronDown
				size={14}
				className='inline ml-1'
			/>
		);
	};

	return {
		handleSort,
		renderSortIcon,
		isPending
	};
}
