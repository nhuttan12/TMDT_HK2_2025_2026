'use client'

import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { useState } from 'react';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { exportExcelFile } from '@/utils/shared/exportExcelFile';

export function useGoodsReceiptExcel() {
	const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
	const [isVariantModalOpen, setIsVariantModalOpen] = useState<boolean>(false);
	const [tempSelectedProduct, setTempSelectedProduct] = useState<ProductForGoodsReceipt | null>(null);

	const handleStartExcelFlow = (): void => {
		setIsProductModalOpen(true);
	};

	const handleProductSelected = (product: ProductForGoodsReceipt): void => {
		setTempSelectedProduct(product);
		setIsProductModalOpen(false);
		setIsVariantModalOpen(true);
	};

	const handleVariantsSelected = async (variants: ProductVariantRow[]): Promise<void> => {
		if (!tempSelectedProduct) return;

		await exportExcelFile(tempSelectedProduct, variants);

		setIsVariantModalOpen(false);
		setTempSelectedProduct(null);
	};

	return {
		isProductModalOpen,
		setIsProductModalOpen,
		isVariantModalOpen,
		setIsVariantModalOpen,
		handleStartExcelFlow,
		handleProductSelected,
		handleVariantsSelected,
	};
}