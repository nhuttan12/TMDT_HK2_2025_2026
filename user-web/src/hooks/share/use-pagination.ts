'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export interface UsePaginationReturn {
	currentPage: number;
	changePage: (page: number) => void;
}

export function usePagination(totalPagesFromApi: number = 1): UsePaginationReturn {
	const router = useRouter();
	const searchParams = useSearchParams();

	const pageParam = Number(searchParams.get('page'));
	let currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

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
