'use client';

import { JSX } from 'react';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import InvoiceDetailAdminUi from './invoice-detail-admin-ui';
import { useUserInvoiceDetailQuery } from '@/queries/invoices/admin/use-user-invoice-detail-query';

interface InvoiceDetailAdminContainerProps {
	invoiceId: string;
	initialInvoice: InvoiceDetail;
}

export default function InvoiceDetailAdminContainer({
	invoiceId,
	initialInvoice,
}: InvoiceDetailAdminContainerProps): JSX.Element {
	// Gọi query với dữ liệu khởi tạo từ Server
	const { data: invoiceData } = useUserInvoiceDetailQuery(invoiceId, initialInvoice);

	// Vì đã có initialData nên invoiceData sfẽ luôn tồn tại
	return <InvoiceDetailAdminUi invoice={invoiceData as InvoiceDetail} />;
}
