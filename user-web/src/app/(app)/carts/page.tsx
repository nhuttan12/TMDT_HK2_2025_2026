import { CartItem } from '@/types/carts/CartItem';
import { JSX } from 'react';
import UserCartContainer from '@/app/(app)/carts/_components/user-cart-container';
import { getUserCartByUserId } from '@/services/carts/cart-service';

export default async function Cart(): Promise<JSX.Element> {
    // Mock User ID get from token
    const userId = 1;

	const cartItems: CartItem[] = await getUserCartByUserId(userId);

	return <UserCartContainer carts={cartItems} userId={userId} />;
}
