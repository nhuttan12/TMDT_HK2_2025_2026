import { JSX } from 'react';
import { Metadata } from 'next';
import { CategoryResponse } from '@/types/categories/admin/CategoryResponse';
import { getCategoryAdminDetailByCategoryId } from '@/services/categories/admin/category-admin-service';
import { CategoryDetailInfoAdmin } from '@/types/categories/admin/CategoryDetailInfoAdmin';
import { mapCategoryResponseToAdmin } from '@/utils/categories/mappers/admin-categories';
import CategoryFormContainer from '@/app/admin/categories/_components/category-form-container';

interface Props {
	params: { categoryId: string };
}

export const metadata: Metadata = {
	title: 'Chỉnh sửa thông tin danh mục',
};

export default async function UpdateCategoryPage({ params }: Props): Promise<JSX.Element> {
	// Fetch dữ liệu từ API
	const response: CategoryResponse = await getCategoryAdminDetailByCategoryId(
		Number(params.categoryId),
	);

	// Map sang định dạng của Form ở phía Server
	const initialData: CategoryDetailInfoAdmin = mapCategoryResponseToAdmin(response);

	return (
		<CategoryFormContainer
			initialData={initialData}
			formType='update'
		/>
	);
}
