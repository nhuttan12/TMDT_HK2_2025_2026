import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';
import { ChangeEvent, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

export interface UseProductVariantLogicProps {
	initialData: ProductVariantDetail;
	mode: AdminFormType;
}

export interface UseProductVariantLogicReturn {
	form: ProductVariantDetail;
	loading: boolean;
	isView: boolean;
	isCreate: boolean;
	isUpdate: boolean;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSizeChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleColorChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSalePriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleCostPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleWeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleLengthChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleWidthChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleHeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleImagesChange: (updater: SetStateAction<SortableImageForm[]>) => void;
	handleSubmit: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => Promise<void>;
}

export function useProductVariantLogic(
	props: UseProductVariantLogicProps,
): UseProductVariantLogicReturn {
	const [form, setForm] = useState<ProductVariantDetail>(props.initialData);
	const [loading, setLoading] = useState<boolean>(false);

	const isView: boolean = props.mode === 'view';
	const isCreate: boolean = props.mode === 'create';
	const isUpdate: boolean = props.mode === 'update';

	useEffect(() => {
		setForm(props.initialData);
	}, [props.initialData]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setForm((prev: ProductVariantDetail): ProductVariantDetail => ({ ...prev, [name]: value }));
	};

	// --- Attributes ---
	const handleSizeChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setForm(
			(prev: ProductVariantDetail): ProductVariantDetail => ({
				...prev,
				attributes: [{ ...prev.attributes[0], size: e.target.value }],
			}),
		);
	};

	const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setForm(
			(prev: ProductVariantDetail): ProductVariantDetail => ({
				...prev,
				attributes: [{ ...prev.attributes[0], color: e.target.value }],
			}),
		);
	};

	// --- Pricing ---
	const handleSalePriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setForm(
			(prev: ProductVariantDetail): ProductVariantDetail => ({
				...prev,
				pricing: { ...prev.pricing, salePrice: Number(e.target.value) },
			}),
		);
	};

	const handleCostPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setForm(
			(prev: ProductVariantDetail): ProductVariantDetail => ({
				...prev,
				pricing: { ...prev.pricing, costPrice: Number(e.target.value) },
			}),
		);
	};

	// --- Shipping ---
	const handleWeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setForm(
			(prev: ProductVariantDetail): ProductVariantDetail => ({
				...prev,
				shipping: { ...prev.shipping!, weightInGram: Number(e.target.value) },
			}),
		);
	};

	const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setForm(
			(prev: ProductVariantDetail): ProductVariantDetail => ({
				...prev,
				shipping: {
					...prev.shipping!,
					dimensionsInCm: {
						...prev.shipping!.dimensionsInCm!,
						length: Number(e.target.value),
					},
				},
			}),
		);
	};

	const handleWidthChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setForm(
			(prev: ProductVariantDetail): ProductVariantDetail => ({
				...prev,
				shipping: {
					...prev.shipping!,
					dimensionsInCm: {
						...prev.shipping!.dimensionsInCm!,
						width: Number(e.target.value),
					},
				},
			}),
		);
	};

	const handleHeightChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setForm(
			(prev: ProductVariantDetail): ProductVariantDetail => ({
				...prev,
				shipping: {
					...prev.shipping!,
					dimensionsInCm: {
						...prev.shipping!.dimensionsInCm!,
						height: Number(e.target.value),
					},
				},
			}),
		);
	};

	// --- Images ---
	const handleImagesChange = (updater: SetStateAction<SortableImageForm[]>): void => {
		setForm(
			(prev: ProductVariantDetail): ProductVariantDetail => ({
				...prev,
				images: typeof updater === 'function' ? updater(prev.images) : updater,
			}),
		);
	};

	// --- Submit ---
	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>): Promise<void> => {
		e.preventDefault();
		if (isView) return;

		try {
			setLoading(true);
			if (isCreate) {
				console.log('CALL API CREATE', form);
			}
			if (isUpdate) {
				console.log('CALL API UPDATE', form);
			}
		} catch (error) {
			console.error('Submit error:', error);
		} finally {
			setLoading(false);
		}
	};

	return {
		form: form,
		loading: loading,
		isView: isView,
		isCreate: isCreate,
		isUpdate: isUpdate,
		handleInputChange: handleInputChange,
		handleSizeChange: handleSizeChange,
		handleColorChange: handleColorChange,
		handleSalePriceChange: handleSalePriceChange,
		handleCostPriceChange: handleCostPriceChange,
		handleWeightChange: handleWeightChange,
		handleLengthChange: handleLengthChange,
		handleWidthChange: handleWidthChange,
		handleHeightChange: handleHeightChange,
		handleImagesChange: handleImagesChange,
		handleSubmit: handleSubmit,
	};
}
