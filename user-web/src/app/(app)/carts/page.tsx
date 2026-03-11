'use client';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useCheckoutStore } from '@/stores/checkout.store';
import { CartItem } from '@/types/carts/CartItem';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { JSX, useCallback, useMemo, useState } from 'react';
import { useCartStore } from '@/stores/cart.store';

const mockCart: CartItem[] = [
	{
		productID: 1,
		name: 'Tai nghe Sony WH-1000XM5',
		imageUrl:
			'https://bizweb.dktcdn.net/thumb/1024x1024/100/340/129/products/wh-1000xm5-sonycuongphan-1-1-silver.jpg?v=1714306049613',
		price: 6500000,
		quantity: 1,
	},
	{
		productID: 2,
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
	const [cartItems, setCartItems] = useState<CartItem[]>(mockCart);
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const setCheckoutItems = useCheckoutStore((s) => s.setItems);
	const router = useRouter();

	const updateQuantity = useCartStore((s) => s.updateQuantity);
	const items: CartItem[] = useCartStore((s): CartItem[] => s.items);
	const removeItem = useCartStore((s) => s.removeItem);

	const toggleSelect = useCallback((id: number) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	}, []);

	const toggleSelectAll = useCallback(() => {
		if (selectedIds.length === cartItems.length) {
			setSelectedIds([]);
		} else {
			setSelectedIds(cartItems.map((i) => i.productID));
		}
	}, [selectedIds, cartItems]);

	const selectedItems = useMemo(() => {
		return cartItems.filter((item) => selectedIds.includes(item.productID));
	}, [cartItems, selectedIds]);

	const total = useMemo(() => {
		return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}, [selectedItems]);

	const handleCheckout = () => {
		const selectedItems: CartItem[] = cartItems.filter((item: CartItem) => {
			return selectedIds.includes(item.productID);
		});

		setCheckoutItems(selectedItems);

		//TODO: Call API
		router.push('/checkout');
	};

	const handleRedirectProductDetail = (productID: number): void => {
		router.push(`/products/${productID}`);
	};

	if (!cartItems.length) {
		return (
			<div className='text-center py-10 text-muted-foreground'>
				Giỏ hàng của bạn đang trống.
			</div>
		);
	}

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-10'>
							<input
								type='checkbox'
								checked={selectedIds.length === cartItems.length}
								onChange={toggleSelectAll}
							/>
						</TableHead>
						<TableHead>Sản phẩm</TableHead>
						<TableHead>Giá</TableHead>
						<TableHead className='text-center'>Số lượng</TableHead>
						<TableHead className='text-right'>Thành tiền</TableHead>
						<TableHead className='text-center'>Hành động</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{cartItems.map((item: CartItem) => (
						<TableRow
							key={item.productID}
							className='cursor-pointer'
							onClick={() => handleRedirectProductDetail(item.productID)}
						>
							<TableCell onClick={(e) => e.stopPropagation()}>
								<input
									type='checkbox'
									checked={selectedIds.includes(item.productID)}
									onChange={() => toggleSelect(item.productID)}
								/>
							</TableCell>

							<TableCell className='flex items-center gap-3'>
								<Image
									src={item.imageUrl}
									alt={item.name}
									width={60}
									height={60}
									className='rounded-md'
								/>
								<span className='font-medium'>{item.name}</span>
							</TableCell>

							<TableCell>{item.price.toLocaleString('vi-VN')} ₫</TableCell>

							<TableCell className='text-center'>
								<div className='flex items-center justify-center gap-2'>
									<Button
										variant='outline'
										size='icon'
										onClick={(e) => {
											e.stopPropagation();
											updateQuantity(item.productID, item.quantity - 1);
										}}
									>
										<Minus className='h-4 w-4' />
									</Button>

									<span className='w-8 text-center font-medium'>
										{item.quantity}
									</span>

									<Button
										variant='outline'
										size='icon'
										onClick={(e) => {
											e.stopPropagation();
											updateQuantity(item.productID, item.quantity + 1);
										}}
									>
										<Plus className='h-4 w-4' />
									</Button>
								</div>
							</TableCell>

							<TableCell className='text-right font-semibold'>
								{(item.price * item.quantity).toLocaleString('vi-VN')} ₫
							</TableCell>

							<TableCell className='text-center'>
								<Button
									variant='destructive'
									size='icon'
									onClick={(e) => {
										e.stopPropagation();
										removeItem(item.productID);
									}}
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TableCell colSpan={4}>Tổng cộng</TableCell>
						<TableCell className='text-right font-bold'>
							{total.toLocaleString('vi-VN')} ₫
						</TableCell>
						<TableCell />
					</TableRow>
				</TableFooter>
			</Table>

			<div className='mt-6 flex justify-end'>
				<Button
					disabled={!selectedIds.length}
					onClick={handleCheckout}
				>
					Thanh toán ({selectedIds.length})
				</Button>
			</div>
		</>
	);
}
