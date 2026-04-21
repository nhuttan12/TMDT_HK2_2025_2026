'use client';

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface UsePaginationReturn {
	currentPage: number;
	changePage: (page: number) => void;
}

export function usePagination(): UsePaginationReturn {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const pageParam: number = Number(searchParams.get('page'));
	const currentPage: number = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

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
