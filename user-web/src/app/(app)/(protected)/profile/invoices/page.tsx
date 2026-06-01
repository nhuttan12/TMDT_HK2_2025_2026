import { JSX } from 'react';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import UserInvoicesContainer from './_components/user-invoices-container';
import { getUserInvoicesByUserId } from '@/services/invoices/user/invoice-service';

export default async function InvoicesPage(): Promise<JSX.Element> {
	// TODO: Lấy userId thực tế từ Session/Token. Tạm thời hardcode là 1.
	const userId = '1a2b3c4d-1111-4aaa-8bbb-111111111111';

	// Server-Side Fetching (RSC) với tham số userId
	const initialInvoices = await getUserInvoicesByUserId(userId);

	return (
			<UserInvoicesContainer
				userId={userId}
				initialInvoices={initialInvoices}
			/>
	);
}
