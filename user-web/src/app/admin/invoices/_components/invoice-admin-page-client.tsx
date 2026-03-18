'use client';

import { JSX, useState } from 'react';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { Input } from '@/components/ui/input';
import InvoiceFilter from '@/app/admin/invoices/_components/invoice-filter';
import InvoiceAdminTable from '@/app/admin/invoices/_components/invoice-admin-table';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import InvoiceStatusButtonFilter from '@/app/admin/invoices/_components/invoice-status-button-filter';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { InvoiceFilters } from '@/types/invoices/admin/InvoiceFilters';
import { usePagination } from '@/hooks/use-pagination';
import Pagination from '@/components/layout/share/pagination';

interface Props {
	invoices: UserInvoice[];
}

export default function InvoiceAdminPageClient({ invoices }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const [search, setSearch] = useState('');
	const [status, setStatus] = useState<InvoiceStatus | 'ALL'>('ALL');
	const { currentPage, changePage } = usePagination();

	const filtered: UserInvoice[] = invoices.filter((invoice: UserInvoice): boolean => {
		const matchStatus: boolean = status === 'ALL' || invoice.status === status;

		const matchSearch: boolean = invoice.id.toString().includes(search);

		return matchStatus && matchSearch;
	});

	const currentStatus: InvoiceStatus | null = searchParams.get('status') as InvoiceStatus | null;

	function handleStatusChange(status: InvoiceStatus): void {
		const params = new URLSearchParams(searchParams.toString());

		params.set('status', status);

		router.push(`/admin/invoices?${params.toString()}`);
	}

	function handleApplyFilter(filters: InvoiceFilters) {
		const params = new URLSearchParams(searchParams.toString());

		Object.entries(filters).forEach(([key, value]) => {
			if (value) params.set(key, String(value));
		});

		router.push(`/admin/invoices?${params.toString()}`);
	}

	const handleRedirectToInvoiceDetailAdmin = (invoiceID: number): void => {
		router.push(`/admin/invoices/${invoiceID}`);
	};

	return (
		<div className='space-y-6'>
			<h1 className='text-2xl font-semibold'>Quản lý hóa đơn</h1>

			<div className='flex gap-4'>
				<Input
					placeholder='Tìm theo ID'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='w-[250px]'
				/>

				<InvoiceFilter onApply={handleApplyFilter} />

				<InvoiceStatusButtonFilter
					onClick={handleStatusChange}
					currentStatus={currentStatus}
				/>
			</div>

			<InvoiceAdminTable
				invoices={filtered}
				onRedirectToDetail={handleRedirectToInvoiceDetailAdmin}
			/>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
