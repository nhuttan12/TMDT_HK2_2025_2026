import { ProductForGoodsIssue } from '@/types/inventories/issues/uis/ProductForGoodsIssue';
import { ChangeEvent, useMemo, useState } from 'react';

export interface UseProductSelectionLogicProps {
	products: ProductForGoodsIssue[];
	onSelectProduct: (product: ProductForGoodsIssue) => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function useProductSelectionGoodsIssueLogic({
	products,
	onSelectProduct,
	open: controlledOpen,
	onOpenChange: setControlledOpen,
}: UseProductSelectionLogicProps) {
	// 1. Quản lý trạng thái Đóng/Mở Modal (Hỗ trợ cả Controlled & Uncontrolled)
	const [internalOpen, setInternalOpen] = useState<boolean>(false);
	const isOpen: boolean = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const setIsOpen = setControlledOpen !== undefined ? setControlledOpen : setInternalOpen;

	// 2. Quản lý trạng thái Tìm kiếm
	const [searchTerm, setSearchTerm] = useState<string>('');

	// 3. Logic Lọc dữ liệu
	const filteredProducts: ProductForGoodsIssue[] = useMemo((): ProductForGoodsIssue[] => {
		const lowerSearch: string = searchTerm.toLowerCase();

		return products.filter((product: ProductForGoodsIssue): boolean => {
			return (
				product.name.toLowerCase().includes(lowerSearch) ||
				product.sku.toLowerCase().includes(lowerSearch) ||
				product.serialNumber.toLowerCase().includes(lowerSearch)
			);
		});
	}, [searchTerm, products]);

	// 4. Các hàm Handlers (Arrow functions)
	const handleSelectProduct = (product: ProductForGoodsIssue): void => {
		onSelectProduct(product);
		setIsOpen(false);
		setSearchTerm(''); // Reset tìm kiếm sau khi chọn
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchTerm(e.target.value);
	};

	const handleCloseModal = (): void => {
		setIsOpen(false);
	};

	return {
		isOpen,
		setIsOpen,
		searchTerm,
		filteredProducts,
		handleSelectProduct,
		handleSearchChange,
		handleCloseModal,
	};
}
