import { JSX } from 'react';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import UserInvoicesContainer from './_components/user-invoices-container';
import { getUserInvoicesByUserId } from '@/services/invoices/user/invoice-service';

export default async function InvoicesPage(): Promise<JSX.Element> {
	// TODO: Lấy userId thực tế từ Session/Token. Tạm thời hardcode là 1.
	const userId: number = 1;

	// Server-Side Fetching (RSC) với tham số userId
	const initialInvoices: UserInvoice[] = await getUserInvoicesByUserId(userId);

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Lịch sử hóa đơn</h1>
			<UserInvoicesContainer
				userId={userId}
				initialInvoices={initialInvoices}
			/>
		</div>
	);
}
