import { JSX } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import SingleImageUpload from '@/components/image/admin/single-image-upload';
import { CategoryFormLogicReturn } from '@/hooks/categories/admin/use-category-form-logic';

interface CategoryFormUiProps extends CategoryFormLogicReturn {
	formType: AdminFormType;
}

export function CategoryFormUi({
	form,
	formType,
	handleInputChange,
	handleRichTextChange,
	handleImageChange,
	handleSubmit,
}: CategoryFormUiProps): JSX.Element {
	const isCreate: boolean = formType === 'create';
	const isView: boolean = formType === 'view';

	return (
		<AdminFormWrapper
			title='Quản lý danh mục'
			description={isView ? 'Chi tiết thông tin danh mục' : 'Tạo hoặc chỉnh sửa danh mục'}
			onSubmit={handleSubmit}
			actions={
				!isView && (
					<Button type='submit'>
						{isCreate ? 'Thêm danh mục' : 'Cập nhật danh mục'}
					</Button>
				)
			}
		>
			<Field label='Tên danh mục'>
				<Input
					name='name'
					value={form.name}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</Field>

			<Field label='Slug'>
				<Input
					name='slug'
					value={form.slug}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</Field>

			<Field label='Mô tả'>
				<RichTextEditor
					value={form.description}
					onChange={handleRichTextChange}
					disabled={isView}
				/>
			</Field>

			<Field label='Hình ảnh'>
				<SingleImageUpload
					value={form.image}
					onChange={handleImageChange}
					disabled={isView}
				/>
			</Field>
		</AdminFormWrapper>
	);
}
