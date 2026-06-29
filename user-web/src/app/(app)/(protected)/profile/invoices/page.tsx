import { JSX } from 'react';
import UserInvoicesContainer from './_components/user-invoices-container';
import apiServer from '@/lib/api-server';
import { InvoiceService } from '@/services/invoices/user/invoice-service';

export default async function InvoicesPage(): Promise<JSX.Element> {
	const invoiceService = new InvoiceService(apiServer);
	const userId = '1a2b3c4d-1111-4aaa-8bbb-111111111111';
	const initialInvoices = await invoiceService.getUserInvoicesByUserId(userId,{page:1,limit:1});

	return (
			<UserInvoicesContainer
				userId={userId}
				initialInvoices={initialInvoices}
			/>
	);
}
