'use client';

import { CartItem } from '@/types/carts/CartItem';
import { JSX } from 'react';
import UserCartContainer from '@/app/(app)/carts/_components/user-cart-container';

const mockCart: CartItem[] = [
	{
		productId: 1,
		name: 'Tai nghe Sony WH-1000XM5',
		imageUrl:
			'https://bizweb.dktcdn.net/thumb/1024x1024/100/340/129/products/wh-1000xm5-sonycuongphan-1-1-silver.jpg?v=1714306049613',
		price: 6500000,
		quantity: 1,
	},
	{
		productId: 2,
		name: 'Chuột Logitech MX Master 3',
		imageUrl:
			'https://product.hstatic.net/200000722513/product/mx-master-3s-mouse-top-view-graphite_880f7c80882541c2b4e349b7ed0fa439_de0fb8d222ec49bfb11d909a1f116f7e.png',
		price: 2500000,
		quantity: 2,
	},
];

interface Props {
	params: { id: string };
}

export default function Cart({ params }: Props): JSX.Element {
	return <UserCartContainer carts={mockCart} />;
}
