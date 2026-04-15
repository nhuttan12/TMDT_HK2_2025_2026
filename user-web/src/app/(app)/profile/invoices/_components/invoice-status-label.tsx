import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { JSX } from 'react';

export function getInvoiceStatusLabel(status: InvoiceStatus): JSX.Element | string {
	switch (status) {
		case 'paid':
			return <span className='text-green-600 font-medium'>Đã thanh toán</span>;
		case 'pending':
			return <span className='text-yellow-600 font-medium'>Chờ xử lý</span>;
		case 'pending_approval':
			return <span className='text-orange-600 font-medium'>Chờ duyệt</span>;
		case 'cancelled':
			return <span className='text-red-600 font-medium'>Đã hủy</span>;
		case 'completed':
			return <span className='text-blue-600 font-medium'>Hoàn thành</span>;
		default:
			return status;
	}
}
