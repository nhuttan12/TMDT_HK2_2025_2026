'use client';

import { JSX } from 'react';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import InvoiceAdminTable from '@/app/admin/invoices/_components/invoice-admin-table';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import InvoiceStatusButtonFilter from '@/app/admin/invoices/_components/invoice-status-button-filter';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { InvoiceAdminFilterValues } from '@/types/invoices/admin/InvoiceAdminFilterValues';
import { usePagination } from '@/hooks/share/use-pagination';
import Pagination from '@/components/layout/share/pagination';
import { PaymentMethod } from '@/types/invoices/user/PaymentMethod';
import { FilterField } from '@/types/uis/FilterField';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import {getPaymentMethodLabel} from "@/types/invoices/user/PaymentMethodLabel";

interface Props {
	invoices: UserInvoice[];
}

export default function InvoiceAdminPageClient({ invoices }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const { currentPage, changePage } = usePagination();

	const currentStatus: InvoiceStatus | null = searchParams.get('status') as InvoiceStatus | null;

	function handleStatusChange(status: InvoiceStatus): void {
		const params = new URLSearchParams(searchParams.toString());

		params.set('status', status);

		router.push(`/admin/invoices?${params.toString()}`);
	}

	const handleRedirectToInvoiceDetailAdmin = (invoiceId: number): void => {
		router.push(`/admin/invoices/${invoiceId}`);
	};

	const paymentMethods: PaymentMethod[] = [
		'COD',
		'VNPAY',
		'MoMo',
		'CREDIT_CARD',
		'BANK_TRANSFER',
	];

	const schema: FilterField<InvoiceAdminFilterValues>[] = [
		{
			key: 'paymentMethod',
			label: 'Phương thức thanh toán',
			type: 'select',
			gridSpan: 2,
			options: paymentMethods.map((method: PaymentMethod) => ({
				label: getPaymentMethodLabel(method),
				value: method,
			})),
		},
		{
			key: 'dateFrom',
			label: 'Từ ngày',
			type: 'date',
			gridSpan: 1,
		},
		{
			key: 'dateTo',
			label: 'Đến ngày',
			type: 'date',
			gridSpan: 1,
		},
		{
			key: 'minTotal',
			label: 'Tổng tiền từ',
			type: 'number',
			placeholder: 'Ví dụ: 100000',
			gridSpan: 1,
		},
		{
			key: 'maxTotal',
			label: 'Tổng tiền đến',
			type: 'number',
			placeholder: 'Ví dụ: 500000',
			gridSpan: 1,
		},
		{
			key: 'minItems',
			label: 'Số sản phẩm ≥',
			type: 'number',
			placeholder: 'Ví dụ: 2',
			gridSpan: 2,
		},
	];

	return (
		<div className='space-y-6'>
			{/* Header */}
			<div className='flex space-x-16'>
				<AdminTableHeader<InvoiceAdminFilterValues>
					title='Quản lý hóa đơn'
					description='Quản lý thông tin hoá đơn người dùng sau khi đặt hàng'
					searchPlaceholder='Tìm theo mã hoá đơn'
					filter={true}
					filterField={schema}
				/>

				<InvoiceStatusButtonFilter
					onClick={handleStatusChange}
					currentStatus={currentStatus}
				/>
			</div>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<InvoiceAdminTable
					invoices={invoices}
					onRedirectToDetail={handleRedirectToInvoiceDetailAdmin}
				/>
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
