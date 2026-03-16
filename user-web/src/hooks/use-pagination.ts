'use client';

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function usePagination() {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const currentPage: number = Number(searchParams.get('page')) || 1;

	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());

		params.set('page', String(page));

		router.push(`?${params.toString()}`, { scroll: false });

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return {
		currentPage,
		changePage,
	};
}