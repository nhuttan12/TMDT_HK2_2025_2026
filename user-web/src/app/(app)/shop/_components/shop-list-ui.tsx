// File: src/app/(app)/shops/_components/shop-ui.tsx
'use client';

import { JSX, ReactNode } from 'react';
import Pagination from '@/components/layout/share/pagination'; // Import Component Phân trang của bạn
import { UsePaginationReturn } from '@/hooks/share/use-pagination'; // Import Type của Hook
import { Spinner } from '@/components/ui/spinner';
import ShopCard from '@/components/shops/shop-card';
import { ShopUserCard } from '@/types/shops/user/ShopUserCard';

// Kế thừa các thuộc tính từ UsePaginationReturn để xài phân trang
interface ShopUiProps extends UsePaginationReturn {
	shops: ShopUserCard[];
	totalPages: number;
	isLoading: boolean;
	sidebar?: ReactNode; // Nếu bạn có bộ lọc cho shop
}

export default function ShopListUi({
	shops,
	totalPages,
	isLoading,
	currentPage,
	changePage,
	sidebar,
}: ShopUiProps): JSX.Element {
	return (
		<section className='max-w-7xl mx-auto mt-10 px-4 xl:px-0'>
			<div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
				{/* CỘT TRÁI: Bộ lọc (Nếu có) */}
				{sidebar && (
					<aside className='lg:col-span-1'>
						<div className='sticky top-24'>{sidebar}</div>
					</aside>
				)}

				{/* CỘT PHẢI: Danh sách Shop & Phân trang */}
				<div className={`flex flex-col gap-8 ${sidebar ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
					{isLoading ? (
						<div className='flex items-center justify-center py-40 text-muted-foreground'>
							<Spinner className='w-8 h-8' />
						</div>
					) : shops.length === 0 ? (
						<div className='flex items-center justify-center py-40'>
							<p className='text-gray-500'>Không tìm thấy cửa hàng nào phù hợp.</p>
						</div>
					) : (
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
							{shops.map((shop) => (
								<ShopCard key={shop.id} shop={shop} />
							))}
						</div>
					)}

					{/* GỌI COMPONENT PAGINATION Ở ĐÂY */}
					{!isLoading && shops.length > 0 && totalPages > 1 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={changePage}
						/>
					)}
				</div>
			</div>
		</section>
	);
}