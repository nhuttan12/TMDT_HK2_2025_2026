import { JSX } from 'react';
import UserCartContainer from '@/app/(app)/carts/_components/user-cart-container';
import { CartService } from '@/services/carts/cart-service';
import apiServer from '@/lib/api-server';

export default async function Cart(): Promise<JSX.Element> {


	const cartService = new CartService(apiServer);
    // Mock User ID get from token
    const userId = 'e1d2c3b4-5a6b-7c8d-9e0f-1a2b3c4d5e6f';

	const cartItems = await cartService.getMyUserCart()

	return <UserCartContainer carts={cartItems} userId={userId} />;
}
