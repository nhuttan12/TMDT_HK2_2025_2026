import apiServer from '@/lib/api-server';
import { InvoiceAdminService } from '@/services/invoices/admin/invoice-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import InvoiceAdminContainer from './_components/invoice-admin-container';

export const metadata: Metadata = {
	title: 'Quản lý đơn mua',
};

export default async function Page(): Promise<JSX.Element> {
	const invoiceAdminService = new InvoiceAdminService(apiServer);
	// Gọi service trực tiếp trong Server Component
	const initialInvoices = await invoiceAdminService.getUserInvoiceList();

	return <InvoiceAdminContainer initialInvoices={initialInvoices} />;
}
