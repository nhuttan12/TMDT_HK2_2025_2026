'use client';

import { JSX } from 'react';
import { CategoryDetailInfoAdmin } from '@/types/categories/admin/CategoryDetailInfoAdmin';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { CategoryFormUi } from './category-form-ui';
import {
	CategoryFormLogicReturn,
	useCategoryFormLogic,
} from '@/hooks/categories/admin/use-category-form-logic';

interface CategoryFormContainerProps {
	initialData: CategoryDetailInfoAdmin;
	formType: AdminFormType;
}

export default function CategoryFormContainer(props: CategoryFormContainerProps): JSX.Element {
	const { initialData, formType } = props;

	const logic: CategoryFormLogicReturn = useCategoryFormLogic(initialData, formType);

	return (
		<CategoryFormUi
			formType={formType}
			{...logic}
		/>
	);
}
