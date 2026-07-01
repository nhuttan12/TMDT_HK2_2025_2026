import apiServer from '@/lib/api-server';
import {
    InvoiceAdminService
} from '@/services/invoices/admin/invoice-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import InvoiceDetailAdminContainer from './_components/invoice-detail-admin-container';

interface PageProps {
	params: Promise<{ invoiceId: string }>;
}

export const metadata: Metadata = {
	title: 'Chi tiết hóa đơn',
};

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
	const { invoiceId } = await params;
	const invoiceAdminService = new InvoiceAdminService(apiServer);

	// Gọi service lấy data tại Server
	const initialInvoice = await invoiceAdminService.getUserInvoiceDetailByInvoiceId(invoiceId);

	return (
		<InvoiceDetailAdminContainer
			invoiceId={invoiceId}
			initialInvoice={initialInvoice}
		/>
	);
}
