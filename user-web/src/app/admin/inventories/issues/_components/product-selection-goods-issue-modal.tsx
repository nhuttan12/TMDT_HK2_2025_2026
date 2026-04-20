'use client';

import React, { JSX } from 'react';
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
import { Package, Search } from 'lucide-react';
import { ProductForGoodsIssue } from '@/types/inventories/issues/uis/ProductForGoodsIssue';
import { useProductSelectionGoodsIssueLogic } from '@/hooks/inventories/goods-issues/use-product-selection-goods-issue-logic';

interface ProductSelectionGoodsIssueModalProps {
	products: ProductForGoodsIssue[];
	onSelectProduct: (product: ProductForGoodsIssue) => void;
	trigger?: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function ProductSelectionGoodsIssueModal({
	products,
	onSelectProduct,
	trigger,
	open,
	onOpenChange,
}: ProductSelectionGoodsIssueModalProps): JSX.Element {
	const {
		isOpen,
		setIsOpen,
		searchTerm,
		filteredProducts,
		handleSelectProduct,
		handleSearchChange,
		handleCloseModal,
	} = useProductSelectionGoodsIssueLogic({
		products: products,
		onSelectProduct: onSelectProduct,
		open: open,
		onOpenChange: onOpenChange,
	});

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
						Chọn sản phẩm cho phiếu xuất kho
					</DialogTitle>
				</DialogHeader>

				{/* Search Bar */}
				<div className='relative mb-4'>
					<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
					<Input
						placeholder='Tìm kiếm theo tên, SKU hoặc Serial Number...'
						value={searchTerm}
						onChange={handleSearchChange}
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
						filteredProducts.map(
							(product: ProductForGoodsIssue): JSX.Element => (
								<div
									key={product.id}
									className='flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors'
								>
									<div className='flex items-center gap-3'>
										<div className='w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0'>
											<Package className='w-5 h-5 text-gray-600' />
										</div>
										<div>
											<h3 className='font-medium text-gray-900 line-clamp-1'>
												{product.name}
											</h3>
											{/* Bổ sung hiển thị SKU và Serial Number */}
											<p className='text-sm text-gray-500 mt-0.5'>
												ID: {product.id} <span className='mx-1'>•</span>
												SKU:{' '}
												<span className='font-medium'>
													{product.sku}
												</span>{' '}
												<span className='mx-1'>•</span>
												SN:{' '}
												<span className='font-medium'>
													{product.serialNumber}
												</span>
											</p>
										</div>
									</div>
									<div className='flex items-center gap-2 shrink-0'>
										<Badge
											className={
												product.status
													? 'bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-950 dark:hover:text-green-300'
													: 'bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-950 dark:hover:text-red-300'
											}
										>
											{product.status ? 'Hợp lệ' : 'Lỗi/Khóa'}
										</Badge>
										<Button
											size='sm'
											onClick={(): void => handleSelectProduct(product)}
											disabled={!product.status}
											className='cursor-pointer'
										>
											Chọn
										</Button>
									</div>
								</div>
							),
						)
					)}
				</div>

				{/* Footer */}
				<div className='flex justify-between items-center pt-4 border-t'>
					<span className='text-sm text-gray-500'>
						{filteredProducts.length} sản phẩm được tìm thấy
					</span>
					<Button
						variant='outline'
						onClick={handleCloseModal}
					>
						Đóng
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
