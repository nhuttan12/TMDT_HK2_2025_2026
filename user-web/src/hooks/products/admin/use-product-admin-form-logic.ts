import { ChangeEvent, SetStateAction, SyntheticEvent, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { ProductVariant } from '@/types/products/admin/variant/ProductVariant';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { ProductCreateDTO } from '@/types/products/admin/ProductCreateDTO';
import { ProductUpdateDTO } from '@/types/products/admin/ProductUpdateDTO';

import { mapFormToCreateDTO, mapFormToUpdateDTO } from '@/utils/products/mappers/admin-product';
import { generateSlug } from '@/utils/shared/mappers/slug';
import { useTableSelection, UseTableSelectionReturn } from '@/hooks/share/use-table-selection';
import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { AppRole } from '@/types/uis/AppRole';

export interface UseProductAdminFormLogicProps {
	formType: AdminFormType;
	productAdmin: ProductDetailInfoAdmin;
	role: AppRole;
	productApproval?: boolean;
}

export interface UseProductAdminFormLogicReturn extends UseTableSelectionReturn<number> {
	form: ProductDetailInfoAdmin;
	isCreate: boolean;
	isView: boolean;
	isUpdate: boolean;
	isShopOwner: boolean;
	isAdmin: boolean;
	modal: UseStatusModalReturn;

	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: SyntheticEvent) => void;
	handleStatusChange: (checked: boolean) => void;
	handleImagesChange: (updater: SetStateAction<SortableImageForm[]>) => void;
	handleDescriptionChange: (val: string) => void;

	handleRedirectToProductVariantDetail: (variantId: number) => void;
	handleAddNewVariant: () => void;
	handleEditVariant: (variantId: number) => void;

	handleTriggerDeleteVariant: (variantId: number) => void;
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
	const allKeys: number[] = form.productVariants?.map((p: ProductVariant): number => p.id) ?? [];
	const selection = useTableSelection<number>(allKeys);

	// 3. Modal & Deletion State
	const modal: UseStatusModalReturn = useStatusModal();
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setForm(
			(prev: ProductDetailInfoAdmin): ProductDetailInfoAdmin => ({
				...prev,
				[name]: value,
				slug: name === 'name' ? generateSlug(value) : prev.slug,
			}),
		);
	};

	const handleSubmit = (e: SyntheticEvent): void => {
		e.preventDefault();
		if (isCreate) {
			const dto: ProductCreateDTO = mapFormToCreateDTO(form);
			console.log('Create DTO:', dto);
		} else {
			const dto: ProductUpdateDTO = mapFormToUpdateDTO(form);
			console.log('Update DTO:', dto);
		}
	};

	const handleStatusChange = (checked: boolean): void => {
		setForm(
			(prev: ProductDetailInfoAdmin): ProductDetailInfoAdmin => ({
				...prev,
				status: checked,
			}),
		);
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

	const handleRedirectToProductVariantDetail = (variantId: number): void => {
		router.push(`/admin/products/${form.id}/variant/${variantId}`);
	};

	const handleAddNewVariant = (): void => {
		router.push(`/admin/products/${form.id}/variant/add-new`);
	};

	const handleEditVariant = (variantId: number): void => {
		router.push(`/admin/products/${form.id}/variant/edit/${variantId}`);
	};

	const handleTriggerDeleteVariant = (variantId: number): void => {
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
		router.push('/admin/product-approvals');
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
		handleStatusChange,
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
