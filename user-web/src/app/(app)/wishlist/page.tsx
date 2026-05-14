import { JSX, Suspense } from 'react';
import { Metadata } from 'next';
import WishlistContainer from './_components/wishtlist-container';
import { getProductsFromWishlist } from '@/services/products/user/wishlist-service';

export const metadata: Metadata = {
	title: 'Sản phẩm yêu thích | TerraCraft',
	description: 'Quản lý danh sách các sản phẩm Terrarium bạn đã yêu thích để xem và mua lại sau.',
};

interface WishlistPageProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function WishlistPage({
	searchParams,
}: WishlistPageProps): Promise<JSX.Element> {
	const page = Number(searchParams.page) || 1;

	const initialData = await getProductsFromWishlist(page);

	return (
		<main className='max-w-7xl mx-auto mt-5'>
			<WishlistContainer
				initialData={initialData}
				urlPage={page}
			/>
		</main>
	);
}
