'use client';

import React, { JSX, useState } from 'react';
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
import { getPaymentMethodLabel, PaymentMethod } from '@/types/invoices/user/PaymentMethod';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';

interface Props {
	invoices: UserInvoice[];
	onRedirectToDetail: (invoiceID: number) => void;
}

export default function InvoiceAdminTable({ invoices, onRedirectToDetail }: Props): JSX.Element {
	const [selected, setSelected] = useState<number[]>([]);

	const toggleSelect = (invoiceID: number): void => {
		setSelected((prev: number[]): number[] =>
			prev.includes(invoiceID)
				? prev.filter((x: number): boolean => x !== invoiceID)
				: [...prev, invoiceID],
		);
	};

	const toggleSelectAll = (): void => {
		if (selected.length === invoices.length) {
			setSelected([]);
		} else {
			setSelected(invoices.map((i: UserInvoice): number => i.id));
		}
	};

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
				onToggle: toggleSelect,
				onToggleAll: toggleSelectAll,
			}}
		/>
	);
}
