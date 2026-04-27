import { ChangeEvent, JSX } from 'react';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Column } from '@/types/uis/Column';
import { GoodsIssueItem } from '@/types/inventories/issues/uis/GoodsIssueItem';
import GoodsIssueStatusBadge from '@/app/admin/inventories/issues/_components/goods-issue-status-badge';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { DataTable } from '@/components/layout/admin/data-table';
import { getPartnerTypeLabel } from '@/types/inventories/issues/uis/PartnerTypeLabel';
import { getGoodsIssueTypeLabel } from '@/types/inventories/issues/uis/GoodsIssueTypeLabel';
import { formatDateForInput } from '@/utils/shared/date';
import { ProductSelectionGoodsIssueModal } from '@/app/admin/inventories/issues/_components/goods-issue-detail/product-selection-goods-issue-modal';
import { StatusModal } from '@/components/layout/share/status-modal';
import { getStatusModalTitle } from '@/utils/shared/mappers/modalTitleMap';
import { Trash } from 'lucide-react';
import { GoodsIssueLogicReturn } from '@/hooks/inventories/goods-issues/use-goods-issue-form-logic';

type GoodsIssueFormUiProps = GoodsIssueLogicReturn;

export function GoodsIssueFormUi(props: GoodsIssueFormUiProps): JSX.Element {
	const {
		form,
		isView,
		isCreate,
		totalQuantity,
		totalAmount,
		products,
		statusModal,
		updateField,
		handleUpdateItem,
		handleRemoveItem,
		handleAddProductToForm,
		onFormSubmit,
		handleBack,
	} = props;

	// Định nghĩa cấu trúc cột hiển thị ngay trong UI Component
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
		{
			key: 'actions',
			header: <span className='text-right block w-full'>Xóa</span>,
			render: function (item: GoodsIssueItem): JSX.Element {
				return (
					<div className='text-right'>
						<Button
							type='button'
							variant='ghost'
							size='icon'
							disabled={isView}
							onClick={(): void => handleRemoveItem(item.id)}
							className='text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer'
						>
							<Trash size={16} />
						</Button>
					</div>
				);
			},
		},
	];

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
							onClick={handleBack}
						>
							Hủy bỏ
						</Button>
						{!isView && (
							<Button
								type='submit'
								disabled={statusModal.isOpen && statusModal.status === 'loading'}
							>
								{isCreate ? 'Xác nhận xuất' : 'Cập nhật'}
							</Button>
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
						<Input
							value={form.partner?.name || ''}
							placeholder={`Chọn ${getPartnerTypeLabel(form.partner.type)}...`}
							disabled={isView}
							onChange={function (e: ChangeEvent<HTMLInputElement>): void {
								updateField('partner', { ...form.partner, name: e.target.value });
							}}
						/>
					</Field>

					<Field label='Ngày xuất kho'>
						<Input
							type='date'
							value={formatDateForInput(form.exportDate)}
							disabled={isView}
							onChange={function (e: ChangeEvent<HTMLInputElement>): void {
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
						{!isView && (
							<ProductSelectionGoodsIssueModal
								products={products}
								onSelectProduct={handleAddProductToForm}
								trigger={
									<Button className='cursor-pointer'>+ Thêm sản phẩm</Button>
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
				isOpen={statusModal.isOpen}
				onClose={statusModal.closeModal}
				status={statusModal.status}
				title={getStatusModalTitle(statusModal.status)}
				description={statusModal.message}
				confirmText='Đóng'
			/>
		</>
	);
}
