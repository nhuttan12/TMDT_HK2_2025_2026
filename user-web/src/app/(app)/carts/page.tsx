import { CartItem } from '@/types/carts/CartItem';
import { JSX } from 'react';
import UserCartContainer from '@/app/(app)/carts/_components/user-cart-container';
import { getUserCartByUserId } from '@/services/carts/cart-service';

export default async function Cart(): Promise<JSX.Element> {
    // Mock User ID get from token
    const userId = 'e1d2c3b4-5a6b-7c8d-9e0f-1a2b3c4d5e6f';

	const cartItems = await getUserCartByUserId(userId);

	return <UserCartContainer carts={cartItems} userId={userId} />;
}
