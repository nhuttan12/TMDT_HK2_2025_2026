'use client';

import { JSX } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRemoveFavoriteMutation, useWishlistQuery } from '@/queries/products/user/use-wishlist-query';
import { useWishlistLogic } from '@/hooks/products/user/use-wishlist-logic';
import WishlistUi from './wishlist-ui';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';

interface FavoritePageContainerProps {
	initialData: PaginationResponse<ProductUserCard>;
	urlPage: number;
}

export default function FavoritePageContainer({
	initialData,
	urlPage,
}: FavoritePageContainerProps): JSX.Element {
	const { data, isLoading } = useWishlistQuery(urlPage, initialData);
	const { mutate: removeFavorite } = useRemoveFavoriteMutation();

	const products = data?.data || [];
	const totalPages = data?.meta?.totalPages || 1;

	// --- CLIENT STATE (Logic Hook) ---
	const { currentPage, changePage, handleRemoveFavorite } = useWishlistLogic({
		totalPages,
		onRemoveFavorite: removeFavorite,
	});

	// --- RENDER UI ---
	return (
		<WishlistUi
			products={products}
			isLoading={isLoading}
			currentPage={currentPage}
			totalPages={totalPages}
			changePage={changePage}
			handleRemoveFavorite={handleRemoveFavorite}
		/>
	);
}
