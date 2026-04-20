import { useState, ChangeEvent, FormEvent } from 'react';
import { CategoryDetailInfoAdmin } from '@/types/categories/admin/CategoryDetailInfoAdmin';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { generateSlug } from '@/utils/shared/mappers/slug';
import { BaseImage } from '@/types/images/admin/BaseImage';
import {
	mapCategoryFormToCreateDTO,
	mapCategoryFormToUpdateDTO,
} from '@/utils/categories/mappers/admin-categories';

export interface CategoryFormLogicReturn {
	form: CategoryDetailInfoAdmin;
	handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleRichTextChange: (val: string) => void;
	handleImageChange: (img: BaseImage | undefined) => void;
	handleSubmit: (e: FormEvent) => void;
}

export function useCategoryFormLogic(
	initialData: CategoryDetailInfoAdmin,
	formType: AdminFormType,
): CategoryFormLogicReturn {
	const [form, setForm] = useState<CategoryDetailInfoAdmin>(initialData);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { name, value } = e.target;
		setForm((prev: CategoryDetailInfoAdmin) => ({
			...prev,
			[name]: value,
			slug: name === 'name' ? generateSlug(value) : prev.slug,
		}));
	};

	const handleRichTextChange = (val: string): void => {
		setForm((prev: CategoryDetailInfoAdmin) => ({ ...prev, description: val }));
	};

	const handleImageChange = (img: BaseImage | undefined): void => {
		setForm((prev: CategoryDetailInfoAdmin) => ({ ...prev, image: img }));
	};

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();

		if (formType === 'create') {
			const dto = mapCategoryFormToCreateDTO(form);
			console.log('Submit Create DTO:', dto);
			// TODO: Call Create API mutation
		}

		if (formType === 'update') {
			const dto = mapCategoryFormToUpdateDTO(form);
			console.log('Submit Update DTO:', dto);
			// TODO: Call Update API mutation
		}
	};

	return {
		form,
		handleInputChange,
		handleRichTextChange,
		handleImageChange,
		handleSubmit,
	};
}
