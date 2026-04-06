import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';
import { GoodsIssueItem } from '@/types/inventories/issues/uis/GoodsIssueItem';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ProductForGoodsIssue } from '@/types/inventories/issues/uis/ProductForGoodsIssue';

interface UseGoodsIssueLogicProps {
	formType: AdminFormType;
	goodsIssue: GoodsIssueDetail;
}

export function useGoodsIssueLogic(props: UseGoodsIssueLogicProps) {
	const router: AppRouterInstance = useRouter();
	const isView: boolean = props.formType === 'view';
	const isCreate: boolean = props.formType === 'create';

	const [form, setForm]: [
		GoodsIssueDetail,
		React.Dispatch<React.SetStateAction<GoodsIssueDetail>>,
	] = useState<GoodsIssueDetail>(props.goodsIssue);

	const updateField = <K extends keyof GoodsIssueDetail>(
		key: K,
		value: GoodsIssueDetail[K],
	): void => {
		setForm((prev: GoodsIssueDetail): GoodsIssueDetail => {
			return { ...prev, [key]: value };
		});
	};

	const handleUpdateItem = (id: number, fields: Partial<GoodsIssueItem>): void => {
		const updatedItems: GoodsIssueItem[] = form.items.map(
			(item: GoodsIssueItem): GoodsIssueItem => {
				if (item.id === id) {
					const newItem: GoodsIssueItem = { ...item, ...fields };
					newItem.totalPrice = newItem.quantity * newItem.unitPrice;
					return newItem;
				}
				return item;
			},
		);
		updateField('items', updatedItems);
	};

	const handleSubmit = async (e: FormEvent): Promise<void> => {
		if (e) {
			e.preventDefault();
		}

		return new Promise<void>((resolve, reject) => {
			// Giả lập độ trễ của mạng (1.5 giây)
			setTimeout(() => {
				resolve(); // Báo hiệu API thành công, Container sẽ mở Modal Xanh
			}, 1500);
		});
	};

	const handleBack = (): void => {
		router.back();
	};

	const totalQuantity: number = form.items.reduce((sum: number, item: GoodsIssueItem): number => {
		return sum + item.quantity;
	}, 0);

	const totalAmount: number = form.items.reduce((sum: number, item: GoodsIssueItem): number => {
		return sum + item.totalPrice;
	}, 0);

	const handleAddProductToForm = (selectedProduct: ProductForGoodsIssue): void => {
		const isExist: boolean = form.items.some(
			(item: GoodsIssueItem): boolean => item.productId === selectedProduct.id,
		);
		if (isExist) {
			alert('Sản phẩm này đã có trong danh sách xuất kho!');
			return;
		}

		const newItem: GoodsIssueItem = {
			id: Date.now(),
			productId: selectedProduct.id,
			productName: selectedProduct.name,
			sku: selectedProduct.sku,
			serialNumber: selectedProduct.serialNumber,
			quantity: 1,
			unitPrice: 0,
			totalPrice: 0,
			batchNumber: '',
		};

		updateField('items', [...form.items, newItem]);
	};

	const handleRemoveItem = (itemId: number): void => {
		const newItems: GoodsIssueItem[] = form.items.filter(
			(item: GoodsIssueItem): boolean => item.id !== itemId,
		);
		updateField('items', newItems);
	};

	return {
		form: form,
		isView: isView,
		isCreate: isCreate,
		totalQuantity: totalQuantity,
		totalAmount: totalAmount,
		updateField: updateField,
		handleUpdateItem: handleUpdateItem,
		handleSubmit: handleSubmit,
		handleBack: handleBack,
		handleAddProductToForm: handleAddProductToForm,
		handleRemoveItem: handleRemoveItem,
	};
}
