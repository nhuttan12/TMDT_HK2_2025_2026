'use client';

import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGoodsIssueLogic } from '@/hooks/inventories/issues/use-goods-issue-logic';
import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';
import { GoodsIssueItem } from '@/types/inventories/issues/uis/GoodsIssueItem';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { Column } from '@/types/uis/Column';
import { ChangeEvent, FormEvent, JSX } from 'react';
import GoodsIssueStatusBadge from '@/app/admin/inventories/issues/_components/goods-issue-status-badge';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { DataTable } from '@/components/layout/admin/data-table';
import { useGoodsIssueData } from '@/hooks/inventories/issues/use-goods-issue-data';
import { getPartnerTypeLabel } from '@/types/inventories/issues/uis/PartnerTypeLabel';
import { getGoodsIssueTypeLabel } from '@/types/inventories/issues/uis/GoodsIssueTypeLabel';
import { formatDateForInput } from '@/utils/shared/date';
import { ProductSelectionGoodsIssueModal } from '@/app/admin/inventories/issues/_components/product-selection-goods-issue-modal';
import { useStatusModal } from '@/hooks/share/use-status-modal';
import { StatusModal } from '@/components/layout/share/status-modal';
import { MODAL_TITLE_MAP } from '@/utils/shared/mappers/modalTitleMap';

interface GoodsIssueDetailViewProps {
	formType: AdminFormType;
	goodsIssue: GoodsIssueDetail;
}

export default function GoodsIssueDetailContainer({
	goodsIssue,
	formType,
}: GoodsIssueDetailViewProps): JSX.Element {
	const { isOpen, status, message, showSuccess, showError, showLoading, closeModal } = useStatusModal();

	const { products } = useGoodsIssueData();

	const {
		form,
		isView,
		isCreate,
		totalQuantity,
		totalAmount,
		updateField,
		handleUpdateItem,
		handleSubmit,
		handleAddProductToForm,
		handleBack,
	} = useGoodsIssueLogic({
		goodsIssue,
		formType,
	});

	const itemColumns: Column<GoodsIssueItem>[] = [
		{
			key: 'productName',
			header: 'Sản phẩm',
			render: function (item: GoodsIssueItem): JSX.Element {
				return (
					<div>
						<p className='font-medium'>{item.productName}</p>
						<p className='text-xs text-slate-500'>{item.sku}</p>
					</div>
				);
			},
		},
		{
			key: 'quantity',
			header: 'Số lượng',
			render: function (item: GoodsIssueItem): JSX.Element {
				return (
					<Input
						type='number'
						className='w-24'
						value={item.quantity}
						disabled={isView}
						onChange={function (e: ChangeEvent<HTMLInputElement>): void {
							handleUpdateItem(item.id, { quantity: Number(e.target.value) });
						}}
					/>
				);
			},
		},
		{
			key: 'totalPrice',
			header: 'Thành tiền',
			render: function (item: GoodsIssueItem): string {
				return item.totalPrice.toLocaleString() + ' ₫';
			},
		},
	];

	const onFormSubmit = async (e: FormEvent): Promise<void> => {
		try {
			// 1. Bật Modal Loading CHẶN THAO TÁC ngay lập tức
			showLoading('Đang xử lý dữ liệu, vui lòng chờ...');

			// 2. Gọi logic xử lý (API / Delay)
			await handleSubmit(e);

			// 3. Nếu không có lỗi, đổi trạng thái Modal sang Success
			showSuccess(
				isCreate ? 'Tạo phiếu xuất kho thành công!' : 'Cập nhật phiếu xuất kho thành công!',
			);
		} catch (error) {
			console.error(error);
			showError('Lưu dữ liệu thất bại. Vui lòng kiểm tra lại kết nối hoặc số lượng tồn kho.');
		}
	};

	return (
		<>
			<AdminFormWrapper
				title='Quản lý xuất kho'
				description={`Loại hình: ${getGoodsIssueTypeLabel(form.type)}`}
				onSubmit={onFormSubmit}
				actions={
					<div className='flex gap-3'>
						<Button
							type='button'
							variant='outline'
							onClick={(): void => handleBack()}
						>
							Hủy bỏ
						</Button>
						{!isView && (
							<Button type='submit'>{isCreate ? 'Xác nhận xuất' : 'Cập nhật'}</Button>
						)}
					</div>
				}
			>
				<div className='grid grid-cols-2 gap-6 p-6 rounded-xl border bg-card shadow-sm'>
					<Field label='Mã chứng từ'>
						<Input
							value={form.code}
							disabled={true}
							className='bg-slate-50 font-mono'
						/>
					</Field>

					<Field label='Trạng thái'>
						<div className='py-2'>
							<GoodsIssueStatusBadge status={form.status} />
						</div>
					</Field>

					<Field label={getPartnerTypeLabel(form.partner.type)}>
						{/* Trong thực tế bạn có thể thay Input bằng một Select component */}
						<Input
							value={form.partner?.name || ''}
							placeholder={`Chọn ${getPartnerTypeLabel(form.partner.type)}...`}
							disabled={isView}
							onChange={function (e: ChangeEvent<HTMLInputElement>): void {
								// Logic giả lập: cập nhật tên partner trực tiếp
								updateField('partner', { ...form.partner, name: e.target.value });
							}}
						/>
					</Field>

					<Field label='Ngày xuất kho'>
						<Input
							type='date'
							value={formatDateForInput(form.exportDate)}
							disabled={isView}
							onChange={(e: ChangeEvent<HTMLInputElement>): void => {
								updateField('exportDate', e.target.value);
							}}
						/>
					</Field>
				</div>

				<div className='mt-6'>
					<Field label='Ghi chú/Lý do xuất'>
						<RichTextEditor
							value={form.note || ''}
							disabled={isView}
							onChange={function (val: string): void {
								updateField('note', val);
							}}
						/>
					</Field>
				</div>

				<div className='mt-10'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='font-bold text-lg'>Danh sách lô hàng chi tiết</h2>
						{isCreate && (
							<ProductSelectionGoodsIssueModal
								products={products}
								onSelectProduct={handleAddProductToForm}
								trigger={
									<Button className='cursor-pointer'>
										Thêm sản phẩm biến thể cần xuất kho
									</Button>
								}
							/>
						)}
					</div>

					<DataTable<GoodsIssueItem>
						data={form.items}
						columns={itemColumns}
						getRowKey={function (item: GoodsIssueItem): number {
							return item.id;
						}}
					/>
				</div>

				<div className='flex justify-end gap-16 mt-8 pt-6 border-t'>
					<div className='text-right'>
						<p className='text-sm text-slate-500 uppercase tracking-wider'>
							Tổng số lượng
						</p>
						<p className='text-3xl font-black text-slate-900'>{totalQuantity}</p>
					</div>
					<div className='text-right'>
						<p className='text-sm text-slate-500 uppercase tracking-wider'>
							Tổng giá trị
						</p>
						<p className='text-3xl font-black text-blue-600'>
							{totalAmount.toLocaleString()} <span className='text-lg'>₫</span>
						</p>
					</div>
				</div>
			</AdminFormWrapper>

			<StatusModal
				isOpen={isOpen}
				onClose={closeModal}
				status={status}
				title={MODAL_TITLE_MAP[status]}
				description={message}
				confirmText='Đóng'
			/>
		</>
	);
}
