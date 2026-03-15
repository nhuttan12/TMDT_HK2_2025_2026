import { Badge } from '@/components/ui/badge';
import { getInvoiceStatusLabel, InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { JSX } from 'react';

interface Props {
	status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: Props): JSX.Element {
	switch (status) {
		case 'PENDING_APPROVAL':
			return <Badge className='bg-yellow-500'>Chờ phê duyệt</Badge>;

		case 'PENDING':
			return <Badge variant='secondary'>{getInvoiceStatusLabel(status)}</Badge>;

		case 'PAID':
			return <Badge className='bg-blue-500'>{getInvoiceStatusLabel(status)}</Badge>;

		case 'COMPLETED':
			return <Badge className='bg-green-600'>{getInvoiceStatusLabel(status)}</Badge>;

		case 'CANCELLED':
			return <Badge variant='destructive'>{getInvoiceStatusLabel(status)}</Badge>;

		default:
			return <Badge>Unknown</Badge>;
	}
}
