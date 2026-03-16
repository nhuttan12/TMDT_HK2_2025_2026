'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React, { JSX, useState } from 'react';
import { InvoiceStatusBadge } from '@/components/invoice/invoice-status-badge';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { getPaymentMethodLabel, PaymentMethod } from '@/types/invoices/user/PaymentMethod';
import { CheckedState } from '@radix-ui/react-checkbox';

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
			setSelected(invoices.map((i: UserInvoice): number => i.invoiceID));
		}
	};

	const changeStatus = (id: number, status: InvoiceStatus): void => {
		console.log('Update status', id, status);

		// call API here
		// await updateInvoiceStatus(id, status)
	};

	return (
		<Table className='h-[calc(100vh-8.2rem)]'>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[40px]'>
						<Checkbox
							checked={selected.length === invoices.length}
							onCheckedChange={toggleSelectAll}
							className="
								border-2! border-gray-200
							"
						/>
					</TableHead>
					<TableHead>ID</TableHead>
					<TableHead>Ngày tạo</TableHead>
					<TableHead>Trạng thái</TableHead>
					<TableHead>Thanh toán</TableHead>
					<TableHead>Số sản phẩm</TableHead>
					<TableHead>Tổng tiền</TableHead>
					<TableHead className='w-[200px]'>Hành động</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{invoices.map(
					(invoice: UserInvoice): JSX.Element => (
						<TableRow
							key={invoice.invoiceID}
							className='cursor-pointer'
							onClick={(): void => onRedirectToDetail(invoice.invoiceID)}
						>
							<TableCell>
								<Checkbox
									checked={selected.includes(invoice.invoiceID)}
									onClick={(e: React.MouseEvent<HTMLButtonElement>): void =>
										e.stopPropagation()
									}
									onCheckedChange={(): void => toggleSelect(invoice.invoiceID)}
									className="
										border-2! border-gray-200
									"
								/>
							</TableCell>

							<TableCell>#{invoice.invoiceID}</TableCell>

							<TableCell>
								{new Date(invoice.createdAt).toLocaleDateString()}
							</TableCell>

							<TableCell>
								<InvoiceStatusBadge status={invoice.status} />
							</TableCell>

							<TableCell>
								{getPaymentMethodLabel(invoice.paymentMethod as PaymentMethod)}
							</TableCell>

							<TableCell>{invoice.totalItems}</TableCell>

							<TableCell className='font-medium'>
								{invoice.totalAmount.toLocaleString()} đ
							</TableCell>

							<TableCell>
								<Select
									defaultValue={invoice.status}
									onValueChange={(value: string): void =>
										changeStatus(invoice.invoiceID, value as InvoiceStatus)
									}
								>
									<SelectTrigger className='w-[160px]'>
										<SelectValue />
									</SelectTrigger>

									<SelectContent>
										{invoice.status === 'PENDING_APPROVAL' ? (
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
							</TableCell>
						</TableRow>
					),
				)}
			</TableBody>
		</Table>
	);
}
