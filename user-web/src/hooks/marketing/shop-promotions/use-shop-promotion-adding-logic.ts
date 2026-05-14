import { ChangeEvent, SyntheticEvent, useState } from 'react';

import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { useTableSelection, UseTableSelectionReturn } from '@/hooks/share/use-table-selection';
import { useTableSort, UseTableSortReturn } from '@/hooks/share/use-table-sort';
import { ProductPromotionForAdding } from '@/types/marketing/shop-promotions/ProductPromotionForAdding';
import { ProductPromotionSortField } from '@/types/marketing/shop-promotions/ProductPromotionSortField';
import { PromotionForAdding } from '@/types/marketing/shop-promotions/PromotionForAdding';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';

export interface UseShopPromotionAddingLogicReturn {
	form: Omit<PromotionForAdding, 'products'>; // Tạm bỏ products ra khỏi form tĩnh
	selection: UseTableSelectionReturn<number>;
	sorting: UseTableSortReturn<ProductPromotionSortField>;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleDateChange: (field: 'fromDate' | 'toDate', value: string) => void;
	handleStatusChange: (checked: boolean) => void;
	handleSubmit: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
	isSubmitting: boolean;

	// Quản lý Modal & Bảng phụ
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	modalSelection: UseTableSelectionReturn<number>;
	handleConfirmSelection: () => void;

	// Quản lý Bảng chính (Sản phẩm đã chọn)
	selectedProducts: ProductPromotionForAdding[];
	handleDiscountPriceChange: (id: number, val: string) => void;
	handleRemoveProduct: (id: number) => void;

	statusModal: UseStatusModalReturn;
}

export function useShopPromotionAddingLogic(
	availableProducts: ProductPromotionForAdding[],
): UseShopPromotionAddingLogicReturn {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	// Khởi tạo Status Modal
	const statusModal: UseStatusModalReturn = useStatusModal();

	// State Bảng chính
	const [selectedProducts, setSelectedProducts] = useState<ProductPromotionForAdding[]>([]);

	// State Modal & Bảng phụ
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	// 1. Form State
	const [form, setForm] = useState<Omit<PromotionForAdding, 'products'>>({
		promotionName: '',
		arrange: { fromDate: '', toDate: '' },
		status: true,
	});

	// 2. Logic Selection (Lấy tất cả ID của sản phẩm gán vào hook)
	const allKeys: number[] = availableProducts.map((p) => p.id);
	const modalSelection: UseTableSelectionReturn<number> = useTableSelection<number>(allKeys);

	// 3. Logic Sorting
	const sorting = useTableSort<ProductPromotionSortField>();

	// --- Handlers ---
	// Mở Modal (Đồng bộ danh sách đã chọn trước đó vào Checkbox)
	const openModal = () => {
		modalSelection.setSelected(selectedProducts.map((p) => p.id));
		setIsModalOpen(true);
	};
	const closeModal = () => setIsModalOpen(false);

	const handleConfirmSelection = () => {
		// Tìm các sản phẩm được tích chọn từ Modal
		const newSelectedList = availableProducts
			.filter((p) => modalSelection.selected.includes(p.id))
			.map((p) => {
				// Nếu sản phẩm đã có trong danh sách chính thì giữ nguyên giá trị đã nhập
				const existing = selectedProducts.find((sp) => sp.id === p.id);
				if (existing) return existing;

				// Nếu là sản phẩm mới, khởi tạo discountPrice = 0
				return {
					id: p.id,
					productVariantName: p.productVariantName,
					salePrice: p.salePrice,
					status: p.status,
					discountPrice: 0,
					discount: 0,
					systemStatus: p.systemStatus,
				};
			});

		setSelectedProducts(newSelectedList);
		closeModal();
	};

	const handleDiscountPriceChange = (id: number, val: string) => {
		const newDiscountPrice = Number(val) || 0;

		setSelectedProducts((prev) =>
			prev.map((p) => {
				if (p.id === id) {
					// Gọi hàm calculateDiscount bạn đã cung cấp
					const discountPercent = calculateDiscount(p.salePrice, newDiscountPrice);

					return {
						...p,
						discountPrice: newDiscountPrice,
						discount: discountPercent,
					};
				}
				return p;
			}),
		);
	};

	const handleRemoveProduct = (id: number) => {
		setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
	};

	// --- CÁC HÀM FORM ---
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleDateChange = (field: 'fromDate' | 'toDate', value: string): void => {
		setForm((prev) => ({
			...prev,
			arrange: { ...prev.arrange, [field]: value },
		}));
	};

	const handleStatusChange = (checked: boolean): void => {
		setForm((prev) => ({ ...prev, status: checked }));
	};

	const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>): void => {
		e.preventDefault();

		if (selectedProducts.length === 0) {
			alert('Vui lòng chọn ít nhất 1 sản phẩm cho khuyến mãi!');
			return;
		}

		// VALIDATE GIÁ KHUYẾN MÃI
		const invalidProducts: ProductPromotionForAdding[] = selectedProducts.filter(
			(p: ProductPromotionForAdding): boolean => p.discountPrice <= 0 || p.discountPrice >= p.salePrice,
		);

		if (invalidProducts.length > 0) {
			statusModal.showError(
				`Có ${invalidProducts.length} sản phẩm cấu hình giá sai. Giá khuyến mãi phải lớn hơn 0 và THẤP HƠN giá gốc.`,
			);
			return; // Dừng lại, không cho submit
		}

		// Payload hoàn chỉnh theo đúng interface PromotionForAdding
		const payload: PromotionForAdding = {
			...form,
			products: selectedProducts,
		};

		setIsSubmitting(true);
		console.log('Gửi dữ liệu tạo khuyến mãi:', payload);

		// Giả lập API Success
		setTimeout(() => {
			setIsSubmitting(false);
			// router.push('/admin/marketing/shop-promotions');
		}, 1000);
	};

	return {
		form: form,
		selection: modalSelection,
		sorting: sorting,
		handleInputChange: handleInputChange,
		handleDateChange: handleDateChange,
		handleStatusChange: handleStatusChange,
		handleSubmit: handleSubmit,
		isSubmitting: isSubmitting,

		isModalOpen: isModalOpen,
		openModal: openModal,
		closeModal: closeModal,
		modalSelection: modalSelection,
		handleConfirmSelection: handleConfirmSelection,
		selectedProducts: selectedProducts,
		handleDiscountPriceChange: handleDiscountPriceChange,
		handleRemoveProduct: handleRemoveProduct,

		statusModal: statusModal,
	};
}
