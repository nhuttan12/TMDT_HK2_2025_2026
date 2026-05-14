'use client';

import Pagination from '@/components/layout/share/pagination';
import ProductList from '@/components/products/user/product-list';
import { Spinner } from '@/components/ui/spinner';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { JSX } from 'react';

interface WishlistUiProps {
	products: ProductUserCard[];
	isLoading: boolean;
	currentPage: number;
	totalPages: number;
	changePage: (page: number) => void;
	handleRemoveFavorite: (productId: number) => void;
}

export default function WishlistUi({
	products,
	isLoading,
	currentPage,
	totalPages,
	changePage,
	handleRemoveFavorite,
}: WishlistUiProps): JSX.Element {
	return (
		<div className='w-full'>
			{isLoading ? (
				<div className='py-20 flex flex-col items-center justify-center text-slate-500 gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm mx-4'>
					<Spinner className='size-8 animate-spin text-emerald-500' />
					<span className='text-sm font-medium'>Đang tải danh sách...</span>
				</div>
			) : (
				<div className='flex flex-col'>
					{/* Render danh sách sản phẩm bằng Component của bạn */}
					<ProductList products={products} />

					{/* Chỉ hiển thị thanh phân trang nếu có nhiều hơn 1 trang */}
					{totalPages > 1 && (
						<div className='mt-6 mb-8'>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={changePage}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
