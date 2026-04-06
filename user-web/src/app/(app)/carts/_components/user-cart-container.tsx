import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { CartItem } from '@/types/carts/CartItem';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { JSX, useCallback, useMemo, useState } from 'react';
import { useCheckoutStore } from '@/stores/checkout.store';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart.store';

interface Props {
	carts: CartItem[];
}

export default function UserCartContainer({ carts }: Props): JSX.Element {
	const [cartItems] = useState<CartItem[]>(carts);
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const setCheckoutItems = useCheckoutStore((s) => s.setItems);
	const router = useRouter();

	const updateQuantity = useCartStore((s) => s.updateQuantity);
	// const items: CartItem[] = useCartStore((s): CartItem[] => s.items);
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
			setSelectedIds(cartItems.map((i) => i.productId));
		}
	}, [selectedIds, cartItems]);

	const selectedItems = useMemo(() => {
		return cartItems.filter((item) => selectedIds.includes(item.productId));
	}, [cartItems, selectedIds]);

	const total = useMemo(() => {
		return selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}, [selectedItems]);

	const handleCheckout = () => {
		const selectedItems: CartItem[] = cartItems.filter((item: CartItem) => {
			return selectedIds.includes(item.productId);
		});

		setCheckoutItems(selectedItems);

		//TODO: Call API
		router.push('/checkout');
	};

	const handleRedirectProductDetail = (productId: number): void => {
		router.push(`/products/${productId}`);
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
							key={item.productId}
							className='cursor-pointer'
							onClick={() => handleRedirectProductDetail(item.productId)}
						>
							<TableCell onClick={(e) => e.stopPropagation()}>
								<input
									type='checkbox'
									checked={selectedIds.includes(item.productId)}
									onChange={() => toggleSelect(item.productId)}
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
											updateQuantity(item.productId, item.quantity - 1);
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
											updateQuantity(item.productId, item.quantity + 1);
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
										removeItem(item.productId);
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
