'use client';

import { DataTable } from '@/components/layout/admin/data-table';
import { useTableSelection } from '@/hooks/share/use-table-selection';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { PaymentMethod } from '@/types/invoices/user/PaymentMethod';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { Column } from '@/types/uis/Column';
import { getPaymentMethodLabel } from '@/utils/invoices/payment-method-label';
import { JSX } from 'react';
import { InvoiceStatusSelect } from './invoice-status-select';
import { InvoiceStatusBadge } from '@/components/invoices/invoice-status-badge';

interface Props {
	invoices: UserInvoice[];
	onRedirectToDetail: (invoiceId: number) => void;
}

export default function InvoiceAdminTable({ invoices, onRedirectToDetail }: Props): JSX.Element {
	const allKeys: number[] = invoices.map((p: UserInvoice): number => p.id);

	const { selected, onToggle, onToggleAll, isAllSelected, isIndeterminate } =
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
			render: (row: UserInvoice): string => `#${row.id}`,
		},
		{
			key: 'createdAt',
			header: 'Ngày tạo',
			render: (row: UserInvoice): string => new Date(row.createdAt).toLocaleDateString(),
		},
		{
			key: 'status',
			header: 'Trạng thái',
			render: (row: UserInvoice): JSX.Element => <InvoiceStatusBadge status={row.status} />,
		},
		{
			key: 'paymentMethod',
			header: 'Thanh toán',
			render: (row: UserInvoice): string =>
				getPaymentMethodLabel(row.paymentMethod as PaymentMethod),
		},
		{
			key: 'totalItems',
			header: 'Số sản phẩm',
		},
		{
			key: 'totalAmount',
			header: 'Tổng tiền',
			render: (row: UserInvoice): string => `${row.totalAmount.toLocaleString()} đ`,
		},
		{
			key: 'actions',
			header: 'Hành động',
			render: (row: UserInvoice): JSX.Element => (
				<InvoiceStatusSelect
					invoiceId={row.id}
					status={row.status}
					onChangeStatus={changeStatus}
				/>
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
				onToggle: onToggle,
				onToggleAll: onToggleAll,
				isAllSelected,
				isIndeterminate,
			}}
		/>
	);
}
