import { Badge } from '@/components/ui/badge';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { JSX } from 'react';
import { getInvoiceStatusLabel } from '@/utils/invoices/invoice-status-label';

interface Props {
	status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: Props): JSX.Element {
	switch (status) {
		case 'pending':
			return (
				<Badge className='bg-yellow-500 hover:bg-yellow-600'>
					{getInvoiceStatusLabel(status)}
				</Badge>
			);

		case 'processing':
			return (
				<Badge className='bg-blue-500 hover:bg-blue-600'>
					{getInvoiceStatusLabel(status)}
				</Badge>
			);

		case 'completed':
			return (
				<Badge className='bg-green-600 hover:bg-green-700'>
					{getInvoiceStatusLabel(status)}
				</Badge>
			);

		case 'cancelled':
			return <Badge variant='destructive'>{getInvoiceStatusLabel(status)}</Badge>;

		case 'returned':
			return (
				<Badge
					variant='secondary'
					className='text-slate-600'
				>
					{getInvoiceStatusLabel(status)}
				</Badge>
			);

		case 'unknown':
		default:
			return <Badge variant='outline'>Không xác định</Badge>;
	}
}
