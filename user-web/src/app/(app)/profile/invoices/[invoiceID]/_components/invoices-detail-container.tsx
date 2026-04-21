'use client';

import { JSX } from 'react';
import { InvoicesDetailUi } from './invoices-detail-ui';
import { useInvoiceDetailQuery } from '@/queries/invoices/user/use-invoice-detail-query';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';

interface InvoicesDetailContainerProps {
	invoiceId: number;
	invoiceDetail: InvoiceDetail;
}

export default function InvoicesDetailContainer({
	invoiceId,
	invoiceDetail,
}: InvoicesDetailContainerProps): JSX.Element {
	// Truyền initialData vào Hook
	const { data: invoice, isLoading } = useInvoiceDetailQuery(invoiceId, invoiceDetail);

	// Ở lần render đầu tiên, isLoading sẽ tự động là false vì đã có initialData
	return (
		<InvoicesDetailUi
			invoice={invoice}
			isLoading={isLoading}
		/>
	);
}
