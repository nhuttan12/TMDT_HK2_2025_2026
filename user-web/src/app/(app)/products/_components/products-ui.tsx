'use client';

import { JSX } from 'react';
import Pagination from '@/components/layout/share/pagination';
import { UsePaginationReturn } from '@/hooks/share/use-pagination';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import ProductFilter from '@/components/products/user/product-filter';
import ProductList from '@/components/products/user/product-list';

interface ProductUiProps extends UsePaginationReturn {
	products: ProductUserCard[];
	isLoading: boolean;
}

export default function ProductUi({
	products,
	isLoading,
	currentPage,
	changePage,
}: ProductUiProps): JSX.Element {
	return (
		<section className='max-w-7xl mx-auto mt-10 space-y-6'>
			<ProductFilter />

			{/* Xử lý hiển thị dựa trên trạng thái loading */}
			{isLoading ? (
				<div className='py-20 flex justify-center items-center text-muted-foreground'>
					{/* TODO: Bạn có thể thay thế text này bằng Skeleton Component của Shadcn UI để UI đẹp hơn */}
					Đang tải danh sách sản phẩm...
				</div>
			) : (
				<ProductList products={products} />
			)}

			{/* Bạn có thể cân nhắc ẩn Pagination đi khi đang Loading nếu muốn */}
			{!isLoading && (
				<Pagination
					currentPage={currentPage}
					totalPages={10}
					onPageChange={changePage}
				/>
			)}
		</section>
	);
}
