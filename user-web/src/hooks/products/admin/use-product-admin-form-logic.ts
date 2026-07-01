import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ChangeEvent, SetStateAction, SyntheticEvent, useState } from 'react';

import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ProductCreateDTO } from '@/types/products/admin/ProductCreateDTO';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { ProductUpdateDTO } from '@/types/products/admin/ProductUpdateDTO';
import { ProductVariantAdmin } from '@/types/products/admin/variant/ProductVariantAdmin';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { useTableSelection, UseTableSelectionReturn } from '@/hooks/share/use-table-selection';
import { AppRole } from '@/types/uis/AppRole';
import { mapFormToCreateDTO, mapFormToUpdateDTO } from '@/utils/products/admin-product';
import { useApproveProductMutation } from '@/queries/products/admin/use-approve-product-mutation';

export interface UseProductAdminFormLogicProps {
	formType: AdminFormType;
	productAdmin: ProductDetailInfoAdmin;
	role: AppRole;
	productApproval?: boolean;
}

export interface UseProductAdminFormLogicReturn extends UseTableSelectionReturn<string> {
	form: ProductDetailInfoAdmin;
	isCreate: boolean;
	isView: boolean;
	isUpdate: boolean;
	isShopOwner: boolean;
	isAdmin: boolean;
	modal: UseStatusModalReturn;

	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: SyntheticEvent) => void;
	handleImagesChange: (updater: SetStateAction<SortableImageForm[]>) => void;
	handleDescriptionChange: (val: string) => void;

	handleRedirectToProductVariantDetail: (variantId: string) => void;
	handleAddNewVariant: () => void;
	handleEditVariant: (variantId: string) => void;

	handleTriggerDeleteVariant: (variantId: string) => void;
	handleConfirmDelete: () => void;
	handleCancelDelete: () => void;

	handleApproveProduct: () => void;
	handleRejectProduct: () => void;
}

export function useProductAdminFormLogic({
	formType,
	productAdmin,
	role,
	productApproval = false,
}: UseProductAdminFormLogicProps): UseProductAdminFormLogicReturn {
	const router: AppRouterInstance = useRouter();

	const isCreate: boolean = formType === 'create';
	const isView: boolean = formType === 'view';
	const isUpdate: boolean = formType === 'update';

	const isShopOwner: boolean = role === 'shop-owner';
	const isAdmin: boolean = role === 'admin';

	// 1. Form State
	const [form, setForm] = useState<ProductDetailInfoAdmin>(productAdmin);

	// 2. Table Selection State
	const allKeys: string[] =
		form.productVariants?.map((p: ProductVariantAdmin): string => p.id) ?? [];
	const selection = useTableSelection<string>(allKeys);

	// 3. Modal & Deletion State
	const modal: UseStatusModalReturn = useStatusModal();
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const { mutate: approveProduct } = useApproveProductMutation({
		onSuccess: () => {
			// Chỉ chuyển trang khi API báo thành công thay vì chuyển ngay lập tức
			modal.showSuccess('Duyệt sản phẩm thành công!');
			router.push('/admin/product-approvals');
		},
		onError: (error) => {
			modal.showError('Đã xảy ra lỗi khi duyệt sản phẩm.');
			console.error(error);
		},
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setForm(
			(prev: ProductDetailInfoAdmin): ProductDetailInfoAdmin => ({
				...prev,
				[name]: value,
			}),
		);
	};

	const handleSubmit = (e: SyntheticEvent): void => {
		e.preventDefault();
		if (isCreate) {
		} else {
		}
	};

	const handleImagesChange = (updater: SetStateAction<SortableImageForm[]>): void => {
		setForm(
			(prev: ProductDetailInfoAdmin): ProductDetailInfoAdmin => ({
				...prev,
				images: typeof updater === 'function' ? updater(prev.images) : updater,
			}),
		);
	};

	const handleDescriptionChange = (val: string): void => {
		setForm(
			(prev: ProductDetailInfoAdmin): ProductDetailInfoAdmin => ({
				...prev,
				description: val,
			}),
		);
	};

	const handleRedirectToProductVariantDetail = (variantId: string): void => {
		router.push(`/admin/products/${form.id}/variant/${variantId}`);
	};

	const handleAddNewVariant = (): void => {
		router.push(`/admin/products/${form.id}/variant/add-new`);
	};

	const handleEditVariant = (variantId: string): void => {
		router.push(`/admin/products/${form.id}/variant/edit/${variantId}`);
	};

	const handleTriggerDeleteVariant = (variantId: string): void => {
		setDeletingId(variantId);
		modal.showWarning(`Bạn có chắc chắn muốn xoá phân loại "${variantId}" không?`);
	};

	const handleConfirmDelete = (): void => {
		if (deletingId !== null) {
			console.log('Call API delete variant:', deletingId);
			setDeletingId(null);
			modal.closeModal();
		}
	};

	const handleCancelDelete = (): void => {
		setDeletingId(null);
		modal.closeModal();
	};

	const handleApproveProduct = () => {
		if (!productApproval) return;
		approveProduct(form.id);
	};

	const handleRejectProduct = () => {
		if (!productApproval) return;
		router.back();
	};

	return {
		...selection, // Spread selected, toggle, toggleAll, isAllSelected, isIndeterminate
		form,
		isCreate,
		isView,
		isUpdate,
		isShopOwner,
		isAdmin,
		modal,
		handleInputChange,
		handleSubmit,
		handleImagesChange,
		handleDescriptionChange,
		handleRedirectToProductVariantDetail,
		handleAddNewVariant,
		handleEditVariant,
		handleTriggerDeleteVariant,
		handleConfirmDelete,
		handleCancelDelete,
		handleApproveProduct,
		handleRejectProduct,
	};
}
