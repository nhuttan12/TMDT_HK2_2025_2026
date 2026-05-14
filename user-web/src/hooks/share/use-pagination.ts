'use client';

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface UsePaginationReturn {
	currentPage: number;
	changePage: (page: number) => void;
}

export function usePagination(totalPagesFromApi: number = 1): UsePaginationReturn {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const pageParam: number = Number(searchParams.get('page'));
	let currentPage: number = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

	if (currentPage > totalPagesFromApi && totalPagesFromApi > 0) {
		currentPage = totalPagesFromApi;
	}

	const changePage = (page: number): void => {
		//guard
		const current: string | null = searchParams.get('page');

		if (current === String(page)) return;

		const params = new URLSearchParams(searchParams.toString());
		params.set('page', String(page));

		router.push(`?${params.toString()}`, { scroll: false });

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return {
		currentPage: currentPage,
		changePage: changePage,
	};
}
