'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface PaginationProps {
	totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const currentPage: number = Number(searchParams.get('page')) || 1;

	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', String(page));

		router.push(`?${params.toString()}`, { scroll: false });

		// Scroll lên top mượt
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handlePrev = () => {
		if (currentPage > 1) changePage(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) changePage(currentPage + 1);
	};

	const generatePages = () => {
		const pages: (number | string)[] = [];

		const siblingCount = 1;
		const left: number = Math.max(currentPage - siblingCount, 1);
		const right: number = Math.min(currentPage + siblingCount, totalPages);

		if (left > 1) {
			pages.push(1);
			if (left > 2) pages.push('...');
		}

		for (let i = left; i <= right; i++) {
			pages.push(i);
		}

		// Always show last page
		if (right < totalPages) {
			if (right < totalPages - 1) pages.push('...');
			pages.push(totalPages);
		}

		return pages;
	};

	return (
		<div className='flex items-center justify-center gap-2 mt-8'>
			{/* Prev */}
			<Button
				variant='outline'
				onClick={handlePrev}
				disabled={currentPage === 1}
				className='p-2 rounded-md border border-gray-200 bg-white
				hover:bg-gray-100 hover:scale-110 transition-all duration-200
				disabled:opacity-40 disabled:cursor-not-allowed'
			>
				<ChevronLeft size={18} />
			</Button>

			{/* Page Numbers */}
			{generatePages().map(
				(page: string | number, index: number): JSX.Element =>
					page === '...' ? (
						<span
							key={index}
							className='px-2 text-gray-400'
						>
							...
						</span>
					) : (
						<Button
							key={index}
							variant='outline'
							onClick={(): void => changePage(Number(page))}
							className={`px-3 py-1 rounded-md text-sm font-medium
							transition-all duration-200 hover:scale-105
							${
								currentPage === page
									? 'bg-black text-white shadow-md'
									: 'bg-white border border-gray-200 hover:bg-gray-100'
							}`}
						>
							{page}
						</Button>
					),
			)}

			{/* Next */}
			<Button
				variant='outline'
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className='p-2 rounded-md border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition'
			>
				<ChevronRight size={18} />
			</Button>
		</div>
	);
}
