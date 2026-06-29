'use client';

import React, { JSX, useMemo, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { Package, Search } from 'lucide-react';

interface ProductSelectionGoodsReceiptModalProps {
	products: ProductForGoodsReceipt[];
	onSelectProduct: (product: ProductForGoodsReceipt) => void;
	trigger?: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function ProductSelectionGoodsReceiptModal({
	products,
	onSelectProduct,
	trigger,
	open: controlledOpen,
	onOpenChange: setControlledOpen,
}: ProductSelectionGoodsReceiptModalProps): JSX.Element {
	const [internalOpen, setInternalOpen] = useState(false);

	const isOpen: boolean = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const setIsOpen = setControlledOpen !== undefined ? setControlledOpen : setInternalOpen;

	const [searchTerm, setSearchTerm] = useState('');

	const filteredProducts: ProductForGoodsReceipt[] = useMemo((): ProductForGoodsReceipt[] => {
		return products.filter((product: ProductForGoodsReceipt): boolean =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [searchTerm, products]);

	const handleSelectProduct = (product: ProductForGoodsReceipt): void => {
		onSelectProduct(product);
		setIsOpen(false);
		setSearchTerm('');
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
			<DialogContent className='max-w-2xl max-h-[80vh] overflow-hidden flex flex-col'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Package className='w-5 h-5' />
						Chọn sản phẩm cho phiếu nhập kho
					</DialogTitle>
				</DialogHeader>

				{/* Search Bar */}
				<div className='relative mb-4'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
					<Input
						placeholder='Tìm kiếm sản phẩm theo tên...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='pl-10'
					/>
				</div>

				{/* Product List */}
				<div className='flex-1 overflow-y-auto space-y-2'>
					{filteredProducts.length === 0 ? (
						<div className='text-center py-8 text-gray-500'>
							Không tìm thấy sản phẩm nào
						</div>
					) : (
						filteredProducts.map((product) => (
							<div
								key={product.id}
								className='flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors'
							>
								<div className='flex items-center gap-3'>
									<div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center'>
										<Package className='w-5 h-5 text-gray-600' />
									</div>
									<div>
										<h3 className='font-medium text-gray-900'>
											{product.name}
										</h3>
										<p className='text-sm text-gray-500'>ID: {product.id}</p>
									</div>
								</div>
								<div className='flex items-center gap-2'>
									{/* <Badge
										className={
											product.status
												? 'bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-950 dark:hover:text-green-300'
												: 'bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-950 dark:hover:text-red-300'
										}
									>
										{product.status ? 'Đang bán' : 'Ngừng bán'}
									</Badge> */}
									<Button
										size='sm'
										onClick={() => handleSelectProduct(product)}
										// disabled={!product.status}
										className='cursor-pointer'
									>
										Chọn
									</Button>
								</div>
							</div>
						))
					)}
				</div>

				{/* Footer */}
				<div className='flex justify-between items-center pt-4 border-t'>
					<span className='text-sm text-gray-500'>
						{filteredProducts.length} sản phẩm được tìm thấy
					</span>
					<Button
						variant='outline'
						onClick={() => setIsOpen}
					>
						Đóng
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
