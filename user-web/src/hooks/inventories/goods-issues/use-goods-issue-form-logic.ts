import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';
import { GoodsIssueItem } from '@/types/inventories/issues/uis/GoodsIssueItem';
import { ProductForGoodsIssue } from '@/types/inventories/issues/uis/ProductForGoodsIssue';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';

export interface UseGoodsIssueLogicProps {
	formType: AdminFormType;
	goodsIssue: GoodsIssueDetail;
}

export interface GoodsIssueLogicReturn {
	form: GoodsIssueDetail;
	isView: boolean;
	isCreate: boolean;
	totalQuantity: number;
	totalAmount: number;
	statusModal: UseStatusModalReturn; // Gom toàn bộ trạng thái Modal vào đây
	updateField: <K extends keyof GoodsIssueDetail>(key: K, value: GoodsIssueDetail[K]) => void;
	handleUpdateItem: (id: string, fields: Partial<GoodsIssueItem>) => void;
	handleRemoveItem: (itemId: string) => void;
	handleAddProductToForm: (selectedProduct: ProductForGoodsIssue) => void;
	onFormSubmit: (e: SyntheticEvent) => Promise<void>;
	handleBack: () => void;
}

export function useGoodsIssueFormLogic(props: UseGoodsIssueLogicProps): GoodsIssueLogicReturn {
	const router = useRouter();
	const { formType, goodsIssue } = props;
	const isView: boolean = formType === 'view';
	const isCreate: boolean = formType === 'create';

	const [form, setForm] = useState<GoodsIssueDetail>(goodsIssue);

	const statusModal: UseStatusModalReturn = useStatusModal();

	const updateField = <K extends keyof GoodsIssueDetail>(
		key: K,
		value: GoodsIssueDetail[K],
	): void => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const handleUpdateItem = (id: string, fields: Partial<GoodsIssueItem>): void => {
		const updatedItems = form.items.map((item) => {
			if (item.id === id) {
				const newItem = { ...item, ...fields };
				newItem.totalPrice = newItem.quantity * newItem.unitPrice;
				return newItem;
			}
			return item;
		});
		updateField('items', updatedItems);
	};

	const handleRemoveItem = (itemId: string): void => {
		updateField(
			'items',
			form.items.filter((item) => item.id !== itemId),
		);
	};

	const handleAddProductToForm = (selectedProduct: ProductForGoodsIssue): void => {
		const isExist = form.items.some((item) => item.variantId === selectedProduct.id);
		if (isExist) {
			alert('Sản phẩm này đã có trong danh sách xuất kho!');
			return;
		}

		const newItem: GoodsIssueItem = {
			id: Date.now().toString(),
			variantId: selectedProduct.id,
			variantName: selectedProduct.name,
			sku: selectedProduct.sku,
			quantity: 1,
			unitPrice: 0,
			totalPrice: 0,
		};

		updateField('items', [...form.items, newItem]);
	};

	// Logic Submit tập trung
	const onFormSubmit = async (e: SyntheticEvent): Promise<void> => {
		e.preventDefault();
		try {
			statusModal.showLoading('Đang xử lý dữ liệu, vui lòng chờ...');
			statusModal.showSuccess(
				isCreate ? 'Tạo phiếu xuất kho thành công!' : 'Cập nhật phiếu xuất kho thành công!',
			);
		} catch (error) {
			console.error(error);
			statusModal.showError(
				'Lưu dữ liệu thất bại. Vui lòng kiểm tra lại kết nối hoặc số lượng tồn kho.',
			);
		}
	};

	const handleBack = (): void => router.back();

	const totalQuantity: number = form.items.reduce(
		(sum: number, item: GoodsIssueItem): number => sum + item.quantity,
		0,
	);

	const totalAmount: number = form.items.reduce(
		(sum: number, item: GoodsIssueItem): number => sum + item.totalPrice,
		0,
	);

	return {
		form: form,
		isView: isView,
		isCreate: isCreate,
		totalQuantity: totalQuantity,
		totalAmount: totalAmount,
		statusModal: statusModal,
		updateField: updateField,
		handleUpdateItem: handleUpdateItem,
		handleRemoveItem: handleRemoveItem,
		handleAddProductToForm: handleAddProductToForm,
		onFormSubmit: onFormSubmit,
		handleBack: handleBack,
	};
}
