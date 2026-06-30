import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import {
	InvoiceService,
} from '@/services/invoices/user/invoice-service';
import { JSX } from 'react';
import InvoicesDetailContainer from './_components/invoices-detail-container';
import apiServer from '@/lib/api-server';

interface Props {
	params: Promise<{ invoiceID: string }>;
}

export default async function InvoiceDetailPage({ params }: Props): Promise<JSX.Element> {
	// Ép kiểu an toàn từ URL
	const resolvedParams = await params;
	const invoiceId = resolvedParams.invoiceID;
	console.log(invoiceId);

	const invoiceService = new InvoiceService(apiServer);
	// Fetch dữ liệu trực tiếp trên Server (RSC)
	const invoiceDetail: InvoiceDetail =
		await invoiceService.getInvoiceDetailByInvoiceId(invoiceId);

	// Truyền thẳng xuống Container làm initialData
	return (
		<InvoicesDetailContainer
			invoiceId={invoiceId}
			invoiceDetail={invoiceDetail}
		/>
	);
}
