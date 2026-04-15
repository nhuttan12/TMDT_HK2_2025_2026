import { CartItem } from '@/types/carts/CartItem';
import { JSX } from 'react';
import UserCartContainer from '@/app/(app)/carts/_components/user-cart-container';
import { fetchUserCart } from '@/services/carts/cart-service';

interface Props {
	params: { id: string };
}

export default async function Cart({ params }: Props): Promise<JSX.Element> {
	const cartItems: CartItem[] = await fetchUserCart();

	return <UserCartContainer carts={cartItems} />;
}
