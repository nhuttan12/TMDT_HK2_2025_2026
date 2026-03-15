'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
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

interface Props {
	invoices: UserInvoice[];
}

export default function InvoiceAdminTable({ invoices }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const [selected, setSelected] = useState<number[]>([]);

	const toggleSelect = (id: number): void => {
		setSelected((prev: number[]): number[] =>
			prev.includes(id) ? prev.filter((x: number): boolean => x !== id) : [...prev, id],
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

	const handleRedirectToInvoiceDetailAdmin = (id: number): void => {
		router.push(`/admin/invoices/${id}`);
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[40px]'>
						<Checkbox
							checked={selected.length === invoices.length}
							onCheckedChange={toggleSelectAll}
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
							onClick={(): void =>
								handleRedirectToInvoiceDetailAdmin(invoice.invoiceID)
							}
						>
							<TableCell>
								<Checkbox
									checked={selected.includes(invoice.invoiceID)}
									onCheckedChange={() => toggleSelect(invoice.invoiceID)}
								/>
							</TableCell>

							<TableCell>#{invoice.invoiceID}</TableCell>

							<TableCell>
								{new Date(invoice.createdAt).toLocaleDateString()}
							</TableCell>

							<TableCell>
								<InvoiceStatusBadge status={invoice.status} />
							</TableCell>

							<TableCell>{invoice.paymentMethod}</TableCell>

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
										<SelectItem value='PENDING'>Pending</SelectItem>

										<SelectItem value='PAID'>Paid</SelectItem>

										<SelectItem value='COMPLETED'>Completed</SelectItem>

										<SelectItem value='CANCELLED'>Cancelled</SelectItem>
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
