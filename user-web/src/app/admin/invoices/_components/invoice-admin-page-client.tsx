'use client';

import { JSX, useState } from 'react';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { Input } from '@/components/ui/input';
import InvoiceFilter from '@/app/admin/invoices/_components/invoice-filter';
import InvoiceAdminTable from '@/app/admin/invoices/_components/invoice-admin-table';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';

interface Props {
	invoices: UserInvoice[];
}

export default function InvoiceAdminPageClient({ invoices }: Props): JSX.Element {
	const [search, setSearch] = useState('');
	const [status, setStatus] = useState<InvoiceStatus | 'ALL'>('ALL');

	const filtered: UserInvoice[] = invoices.filter((invoice: UserInvoice): boolean => {
		const matchStatus: boolean = status === 'ALL' || invoice.status === status;

		const matchSearch: boolean = invoice.invoiceID.toString().includes(search);

		return matchStatus && matchSearch;
	});

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

				<InvoiceFilter
					// value={status}
					// onChange={setStatus}
				/>
			</div>

			<InvoiceAdminTable invoices={filtered} />
		</div>
	);
}
