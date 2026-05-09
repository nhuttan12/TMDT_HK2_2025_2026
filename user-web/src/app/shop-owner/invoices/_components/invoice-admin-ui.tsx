import { JSX } from 'react';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import InvoiceAdminTable from './invoice-admin-table';
import InvoiceStatusButtonFilter from './invoice-status-button-filter';
import Pagination from '@/components/layout/share/pagination';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { InvoiceAdminFilterValues } from '@/types/invoices/admin/InvoiceAdminFilterValues';
import { UseInvoiceAdminLogicReturn } from '@/hooks/invoices/admin/use-invoice-admin-logic';

interface Props extends UseInvoiceAdminLogicReturn {
	invoices: UserInvoice[];
}

export default function InvoiceAdminUi({
	invoices,
	currentPage,
	changePage,
	currentStatus,
	handleStatusChange,
	handleRedirectToInvoiceDetail,
	filterSchema,
}: Props): JSX.Element {
	return (
		<div className='space-y-6'>
			<div className='flex space-x-16'>
				<AdminTableHeader<InvoiceAdminFilterValues>
					title='Quản lý hóa đơn'
					description='Quản lý thông tin hoá đơn người dùng sau khi đặt hàng'
					searchPlaceholder='Tìm theo mã hoá đơn'
					filter={true}
					filterField={filterSchema}
				/>

				<InvoiceStatusButtonFilter
					onClick={handleStatusChange}
					currentStatus={currentStatus}
				/>
			</div>

			<div className='rounded-xl border bg-white'>
				<InvoiceAdminTable
					invoices={invoices}
					onRedirectToDetail={handleRedirectToInvoiceDetail}
				/>
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
