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

export interface UseProductAdminFormLogicProps {
	formType: AdminFormType;
	productAdmin: ProductDetailInfoAdmin;
}

export interface UseProductAdminFormLogicReturn extends UseTableSelectionReturn<number> {
	form: ProductDetailInfoAdmin;
	isCreate: boolean;
	isView: boolean;
	isUpdate: boolean;
	modal: UseStatusModalReturn;

	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: SyntheticEvent) => void;
	handleStatusChange: (checked: boolean) => void;
	handleImagesChange: (updater: SetStateAction<SortableImageForm[]>) => void;
	handleDescriptionChange: (val: string) => void;

	handleRedirectToProductVariantDetail: (variantId: number) => void;
	handleAddNewVariant: () => void;
	handleEditVariant: (variantId: number) => void;

	handleTriggerDeleteVariant: (variant: ProductVariant) => void;
	handleConfirmDelete: () => void;
	handleCancelDelete: () => void;
}

export function useProductAdminFormLogic(
	props: UseProductAdminFormLogicProps,
): UseProductAdminFormLogicReturn {
	const router: AppRouterInstance = useRouter();

	const isCreate: boolean = props.formType === 'create';
	const isView: boolean = props.formType === 'view';
	const isUpdate: boolean = props.formType === 'update';

	// 1. Form State
	const [form, setForm] = useState<ProductDetailInfoAdmin>(props.productAdmin);

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

	const handleTriggerDeleteVariant = (variant: ProductVariant): void => {
		setDeletingId(variant.id);
		modal.showWarning(`Bạn có chắc chắn muốn xoá biến thể "${variant.name}" không?`);
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

	return {
		...selection, // Spread selected, toggle, toggleAll, isAllSelected, isIndeterminate
		form: form,
		isCreate: isCreate,
		isView: isView,
		isUpdate: isUpdate,
		modal: modal,
		handleInputChange: handleInputChange,
		handleSubmit: handleSubmit,
		handleStatusChange: handleStatusChange,
		handleImagesChange: handleImagesChange,
		handleDescriptionChange: handleDescriptionChange,
		handleRedirectToProductVariantDetail: handleRedirectToProductVariantDetail,
		handleAddNewVariant: handleAddNewVariant,
		handleEditVariant: handleEditVariant,
		handleTriggerDeleteVariant: handleTriggerDeleteVariant,
		handleConfirmDelete: handleConfirmDelete,
		handleCancelDelete: handleCancelDelete,
	};
}
