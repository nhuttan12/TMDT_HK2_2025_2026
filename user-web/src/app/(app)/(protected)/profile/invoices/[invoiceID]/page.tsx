import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { getInvoiceDetailByInvoiceId } from '@/services/invoices/user/invoice-service';
import { JSX } from 'react';
import InvoicesDetailContainer from './_components/invoices-detail-container';

interface Props {
	params: { invoiceId: string };
}

export default async function InvoiceDetailPage({ params }: Props): Promise<JSX.Element> {
	// Ép kiểu an toàn từ URL
	const numberId: number = Number(params.invoiceId);

	// Fetch dữ liệu trực tiếp trên Server (RSC)
	const invoiceDetail: InvoiceDetail = await getInvoiceDetailByInvoiceId(numberId);

	// Truyền thẳng xuống Container làm initialData
	return (
		<InvoicesDetailContainer
			invoiceId={numberId}
			invoiceDetail={invoiceDetail}
		/>
	);
}
