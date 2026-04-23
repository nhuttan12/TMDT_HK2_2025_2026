import { JSX } from 'react';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { Metadata } from 'next';
import { getUserInvoiceList } from '@/services/invoices/admin/invoice-admin-servie';
import InvoiceAdminContainer from '@/app/admin/invoices/_components/invoice-admin-container';

export const metadata: Metadata = {
	title: 'Quản lý đơn mua',
};

export default async function Page(): Promise<JSX.Element> {
	// Gọi service trực tiếp trong Server Component
	const initialInvoices: UserInvoice[] = await getUserInvoiceList();

	return <InvoiceAdminContainer initialInvoices={initialInvoices} />;
}
