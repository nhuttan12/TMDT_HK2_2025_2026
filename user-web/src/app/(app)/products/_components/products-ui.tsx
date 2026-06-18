'use client';

import Pagination from '@/components/layout/share/pagination';
import ProductFilterSidebar from '@/components/products/user/product-filter-sidebar';
import ProductList from '@/components/products/user/product-list';
import { Spinner } from '@/components/ui/spinner';
import { UsePaginationReturn } from '@/hooks/share/use-pagination';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { JSX } from 'react';

interface ProductUiProps extends UsePaginationReturn {
	products: ProductUserCard[];
    totalPages: number;
	isLoading: boolean;
}

export default function ProductUi({
	products,
    totalPages,
	isLoading,
	currentPage,
	changePage,
}: ProductUiProps): JSX.Element {
	return (
		<section className='max-w-7xl mx-auto mt-10 px-4 xl:px-0'>
			{/* Chia layout thành lưới: 1 cột trên Mobile, 4 cột trên Desktop */}
			<div className='grid grid-cols-1 gap-1 lg:grid-cols-4'>
				{/* CỘT TRÁI: Thanh lọc sản phẩm (Sidebar) */}
				<aside className='lg:col-span-1'>
					{/* Class sticky giúp Sidebar bám dính vào màn hình khi cuộn chuột */}
					<div className='sticky top-24'>
						<ProductFilterSidebar />
					</div>
				</aside>

				{/* CỘT PHẢI: Danh sách sản phẩm & Phân trang */}
				<div className='flex flex-col gap-8 lg:col-span-3'>
					{/* Xử lý hiển thị dựa trên trạng thái loading */}
					{isLoading ? (
						<div className='flex items-center justify-center py-40 text-muted-foreground'>
							<Spinner className='w-8 h-8' />
						</div>
					) : (
						<ProductList products={products} />
					)}

					{/* Chỉ hiển thị phân trang khi đã load xong và có dữ liệu */}
					{!isLoading && products.length > 0 && (
						<div className='flex justify-center mt-4'>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={changePage}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
