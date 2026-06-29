'use client';

import { CartItem } from '@/types/carts/CartItem';
import { JSX, useEffect, useState } from 'react';
import { useCartQuery } from '@/queries/carts/use-cart-query';
import {  useCartLogic } from '@/hooks/carts/use-cart-logic';
import { UserCartUi } from '@/app/(app)/carts/_components/user-cart-ui';
import { useCartStore } from '@/stores/cart.store';

interface Props {
	carts: CartItem[];
    userId: string
}

export default function UserCartContainer({ carts, userId }: Props): JSX.Element {

	// TanStack Query chịu trách nhiệm call API và quản lý trạng thái Loading
	const { data: serverCartItems } = useCartQuery(userId, carts);

	// Lấy State items từ Zustand
	const cartItems = useCartStore((state) => state.items);

	// 2. Tối ưu Đồng bộ dữ liệu: Chỉ nạp dữ liệu từ server vào Zustand khi thực sự cần thiết
	useEffect(() => {
		if (serverCartItems && serverCartItems.length > 0) {
			// Kiểm tra xem dữ liệu Server và Zustand có thực sự khác nhau không trước khi setState
			// Việc này ngăn chặn vòng lặp render vô hạn (Infinite loop re-render)
			const isDataChanged = JSON.stringify(cartItems) !== JSON.stringify(serverCartItems);

			if (isDataChanged) {
				useCartStore.setState({ items: serverCartItems });
			}
		}
	}, [serverCartItems]); // Chỉ chạy lại khi dữ liệu từ TanStack Query thay đổi

	// Toàn bộ logic bấm nút + - hay Xoá sẽ tương tác trực tiếp với Zustand để UI re-render lập tức
	const logic = useCartLogic(cartItems);

	return (
		<UserCartUi
			cartItems={cartItems} // UI mượt mà ăn theo Zustand store
			isLoading={false} // Trạng thái loading đã được bọc bẫy ở trên
			{...logic}
		/>
	);
}
