'use client';

import { CartItem } from '@/types/carts/CartItem';
import { JSX } from 'react';
import { useCartQuery } from '@/queries/carts/use-cart-query';
import { CartLogicReturn, useCartLogic } from '@/hooks/carts/use-cart-logic';
import { UserCartUi } from '@/app/(app)/carts/_components/user-cart-ui';

interface Props {
	carts: CartItem[];
}

export default function UserCartContainer({ carts }: Props): JSX.Element {
	const { data: cartItems = [], isLoading } = useCartQuery();

	// Logic hook phụ thuộc vào cartItems để tính toán selected, total
	const logic: CartLogicReturn = useCartLogic(cartItems);

	return (
		<UserCartUi
			cartItems={cartItems}
			isLoading={isLoading}
			{...logic}
		/>
	);
}
