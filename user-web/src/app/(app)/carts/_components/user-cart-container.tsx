'use client';

import { CartItem } from '@/types/carts/CartItem';
import { JSX } from 'react';
import { useCartQuery } from '@/queries/carts/use-cart-query';
import { CartLogicReturn, useCartLogic } from '@/hooks/carts/use-cart-logic';
import { UserCartUi } from '@/app/(app)/carts/_components/user-cart-ui';

interface Props {
	carts: CartItem[];
    userId: number
}

export default function UserCartContainer({ carts, userId }: Props): JSX.Element {
	const { data: cartItems = [], isLoading } = useCartQuery(userId, carts);

	// Logic hook phụ thuộc vào cartItems để tính toán selected, total
	const logic = useCartLogic(cartItems);

	return (
		<UserCartUi
			cartItems={cartItems}
			isLoading={isLoading}
			{...logic}
		/>
	);
}
