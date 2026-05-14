import { JSX } from 'react';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { Button } from '@/components/ui/button';
import {getInvoiceStatusLabel} from "@/utils/invoices/invoice-status-label";

interface Props {
	currentStatus?: InvoiceStatus | null;
	onClick: (status: InvoiceStatus) => void;
}

const statuses: InvoiceStatus[] = ['pending_approval', 'pending', 'paid', 'completed', 'cancelled'];

export default function InvoiceStatusButtonFilter({ currentStatus, onClick }: Props): JSX.Element {
	return (
		<div className='flex gap-2 flex-wrap'>
			{statuses.map(
				(status: InvoiceStatus): JSX.Element => (
					<Button
						key={status}
						variant={currentStatus === status ? 'default' : 'outline'}
						onClick={(): void => onClick(status)}
					>
						{getInvoiceStatusLabel(status)}
					</Button>
				),
			)}
		</div>
	);
}
