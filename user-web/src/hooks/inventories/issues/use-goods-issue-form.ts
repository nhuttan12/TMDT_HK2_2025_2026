import { useState } from 'react';
import { ProductForGoodsIssue } from '@/types/inventories/issues/uis/ProductForGoodsIssue';

// export interface UseGoodsIssueFormProps {
//     formType: AdminFormType;
//     goodsIssue: GoodsIssueDetail;
// }

export function useGoodsIssueForm() {
	const [selectedProducts, setSelectedProducts] = useState<ProductForGoodsIssue[]>([]);

	// (Tùy chọn) Helper sinh ID tạm thời cho UI.
	// Nếu ID lấy từ product rồi thì không cần hàm này nữa.
	const generateTempId = (): number => Date.now();

	const handleProductSelection = (product: ProductForGoodsIssue): void => {
		const newBatchItem: ProductForGoodsIssue = {
			id: generateTempId(), // Hoặc dùng thẳng product.id nếu không cho phép trùng lặp
			name: product.name,
			sku: product.sku,
			serialNumber: product.serialNumber,
			status: product.status,
		};

		// Cập nhật state trực tiếp
		setSelectedProducts((prev: ProductForGoodsIssue[]): ProductForGoodsIssue[] => [
			...prev,
			newBatchItem,
		]);
	};

	// Hàm xóa sản phẩm khỏi danh sách (Thường form nào cũng cần)
	const handleRemoveProduct = (idToRemove: number): void => {
		setSelectedProducts((prev: ProductForGoodsIssue[]): ProductForGoodsIssue[] =>
			prev.filter((item: ProductForGoodsIssue): boolean => item.id !== idToRemove),
		);
	};

	return {
		selectedProducts,
		handleProductSelection,
		handleRemoveProduct,
	};
}