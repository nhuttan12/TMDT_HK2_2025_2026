import { JSX } from 'react';
import { getUserInvoiceDetailByInvoiceId } from '@/services/invoices/admin/invoice-admin-servie';
import InvoiceDetailAdminContainer from '@/app/admin/invoices/[invoiceId]/_components/invoice-detail-admin-container';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { Metadata } from 'next';

interface PageProps {
	params: Promise<{ invoiceId: string }>;
}

export const metadata: Metadata = {
	title: 'Chi tiết hóa đơn',
};

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
	const { invoiceId } = await params;
	const id: number = parseInt(invoiceId);

	// Gọi service lấy data tại Server
	const initialInvoice: InvoiceDetail = await getUserInvoiceDetailByInvoiceId(id);

	return (
		<InvoiceDetailAdminContainer
			invoiceId={id}
			initialInvoice={initialInvoice}
		/>
	);
}