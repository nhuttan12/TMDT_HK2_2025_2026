import { JSX } from 'react';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import UserInvoicesContainer from './_components/user-invoices-container';
import { getUserInvoicesByUserId } from '@/services/invoices/user/invoice-service';

export default async function InvoicesPage(): Promise<JSX.Element> {
	// TODO: Lấy userId thực tế từ Session/Token. Tạm thời hardcode là 1.
	const userId: number = 1;

	// Server-Side Fetching (RSC) với tham số userId
	const initialInvoices = await getUserInvoicesByUserId(userId);

	return (
			<UserInvoicesContainer
				userId={userId}
				initialInvoices={initialInvoices}
			/>
	);
}
