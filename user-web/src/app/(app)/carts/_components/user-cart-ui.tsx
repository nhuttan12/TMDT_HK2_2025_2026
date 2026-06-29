import { JSX } from 'react';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CartLogicReturn } from '@/hooks/carts/use-cart-logic';
import { CartItem } from '@/types/carts/CartItem';

interface UserCartUiProps extends CartLogicReturn {
	cartItems: CartItem[];
	isLoading: boolean;
}

export function UserCartUi({
	cartItems,
	isLoading,
	selectedIds,
	total,
	handleToggleSelect,
	handleToggleSelectAll,
	handleUpdateQuantity,
	handleRemoveItem,
	handleCheckout,
	handleRedirectProductDetail,
}: UserCartUiProps): JSX.Element {
	if (isLoading) {
		return <div className='text-center py-10 text-muted-foreground'>Đang tải dữ liệu...</div>;
	}

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
								checked={
									selectedIds.length === cartItems.length && cartItems.length > 0
								}
								onChange={() => handleToggleSelectAll()}
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
							<TableCell onClick={(e: React.MouseEvent) => e.stopPropagation()}>
								<input
									type='checkbox'
									checked={selectedIds.includes(item.productId)}
									onChange={() => handleToggleSelect(item.productId)}
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
								<div className='flex flex-col'>
									<span className='font-medium text-sm sm:text-base'>
										{item.name}
									</span>
									<span className='text-xs text-muted-foreground mt-1'>
										SKU: {item.Sku}
									</span>
								</div>
							</TableCell>

							<TableCell>{item.price.toLocaleString('vi-VN')} ₫</TableCell>

							<TableCell className='text-center'>
								<div className='flex items-center justify-center gap-2'>
									<Button
										variant='outline'
										size='icon'
										onClick={(e: React.MouseEvent) => {
											e.stopPropagation();
											handleUpdateQuantity(item.productId, item.quantity - 1);
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
										onClick={(e: React.MouseEvent) => {
											e.stopPropagation();
											handleUpdateQuantity(item.productId, item.quantity + 1);
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
									onClick={(e: React.MouseEvent) => {
										e.stopPropagation();
										handleRemoveItem(item.productId);
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
					onClick={() => handleCheckout()}
				>
					Thanh toán ({selectedIds.length})
				</Button>
			</div>
		</>
	);
}
