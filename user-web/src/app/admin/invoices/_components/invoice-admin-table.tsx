'use client';

import React, { JSX } from 'react';
import { InvoiceStatusBadge } from '@/components/invoice/invoice-status-badge';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { PaymentMethod } from '@/types/invoices/user/PaymentMethod';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import { useTableSelection } from '@/hooks/share/use-table-selection';
import {getPaymentMethodLabel} from "@/types/invoices/user/PaymentMethodLabel";

interface Props {
	invoices: UserInvoice[];
	onRedirectToDetail: (invoiceId: number) => void;
}

export default function InvoiceAdminTable({ invoices, onRedirectToDetail }: Props): JSX.Element {
	const allKeys: number[] = invoices.map((p: UserInvoice): number => p.id);

	const { selected, toggle, toggleAll, isAllSelected, isIndeterminate } =
		useTableSelection<number>(allKeys);

	const changeStatus = (id: number, status: InvoiceStatus): void => {
		console.log('Update status', id, status);

		// call API here
		// await updateInvoiceStatus(id, status)
	};

	const columns: Column<UserInvoice>[] = [
		{
			key: 'id',
			header: 'ID',
			render: (row) => `#${row.id}`,
		},
		{
			key: 'createdAt',
			header: 'Ngày tạo',
			render: (row) => new Date(row.createdAt).toLocaleDateString(),
		},
		{
			key: 'status',
			header: 'Trạng thái',
			render: (row) => <InvoiceStatusBadge status={row.status} />,
		},
		{
			key: 'paymentMethod',
			header: 'Thanh toán',
			render: (row) => getPaymentMethodLabel(row.paymentMethod as PaymentMethod),
		},
		{
			key: 'totalItems',
			header: 'Số sản phẩm',
		},
		{
			key: 'totalAmount',
			header: 'Tổng tiền',
			render: (row) => `${row.totalAmount.toLocaleString()} đ`,
		},
		{
			key: 'actions',
			header: 'Hành động',
			render: (row) => (
				<Select
					defaultValue={row.status}
					onValueChange={(value) => changeStatus(row.id, value as InvoiceStatus)}
				>
					<SelectTrigger
						className='w-[160px]'
						onClick={(e) => e.stopPropagation()}
					>
						<SelectValue />
					</SelectTrigger>

					<SelectContent>
						{row.status === 'PENDING_APPROVAL' ? (
							<>
								<SelectItem value='APPROVE'>Duyệt đơn</SelectItem>
								<SelectItem value='CANCEL'>Huỷ đơn</SelectItem>
							</>
						) : (
							<>
								<SelectItem value='PENDING'>Chờ thanh toán</SelectItem>
								<SelectItem value='PAID'>Đã thanh toán</SelectItem>
								<SelectItem value='COMPLETED'>Hoàn tất</SelectItem>
								<SelectItem value='CANCELLED'>Đã huỷ</SelectItem>
							</>
						)}
					</SelectContent>
				</Select>
			),
		},
	];

	return (
		<DataTable
			data={invoices}
			columns={columns}
			onRowClick={(row: UserInvoice): void => onRedirectToDetail(row.id)}
			getRowKey={(row: UserInvoice): number => row.id}
			selectable={{
				selected: selected,
				onToggle: toggle,
				onToggleAll: toggleAll,
				isAllSelected,
				isIndeterminate,
			}}
		/>
	);
}
