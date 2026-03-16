import { JSX } from 'react';
import { getInvoiceStatusLabel, InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { Button } from '@/components/ui/button';

interface Props {
	currentStatus?: InvoiceStatus | null;
	onClick: (status: InvoiceStatus) => void;
}

const statuses: InvoiceStatus[] = ['PENDING_APPROVAL', 'PENDING', 'PAID', 'COMPLETED', 'CANCELLED'];

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
