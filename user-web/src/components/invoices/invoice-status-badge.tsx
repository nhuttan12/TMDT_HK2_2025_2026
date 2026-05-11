import { Badge } from '@/components/ui/badge';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { JSX } from 'react';
import {getInvoiceStatusLabel} from "@/utils/invoices/invoice-status-label";

interface Props {
	status: InvoiceStatus;
}

export function InvoiceStatusBadge({ status }: Props): JSX.Element {
	switch (status) {
		case 'pending_approval':
			return <Badge className='bg-yellow-500'>Chờ phê duyệt</Badge>;

		case 'pending':
			return <Badge variant='secondary'>{getInvoiceStatusLabel(status)}</Badge>;

		case 'paid':
			return <Badge className='bg-blue-500'>{getInvoiceStatusLabel(status)}</Badge>;

		case 'completed':
			return <Badge className='bg-green-600'>{getInvoiceStatusLabel(status)}</Badge>;

		case 'cancelled':
			return <Badge variant='destructive'>{getInvoiceStatusLabel(status)}</Badge>;

		default:
			return <Badge>Unknown</Badge>;
	}
}
