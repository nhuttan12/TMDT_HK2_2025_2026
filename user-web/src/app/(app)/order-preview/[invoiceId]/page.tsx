import {
	getPaymentInfoMocking,
	getRecipientInfoMocking,
} from '@/services/invoices/user/invoice-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import OrderPreviewContainer from './_components/order-preview-container';

export const metadata: Metadata = {
	title: 'Xác nhận sản phẩm',
};
interface OrderPreviewProps {
	params: Promise<{ invoiceId: string }>;
}
export default async function Page({ params }: OrderPreviewProps): Promise<JSX.Element> {
	const [recipientData, paymentData] = await Promise.all([
		getRecipientInfoMocking(),
		getPaymentInfoMocking(),
	]);
	const resolvedParams = await params;
	const invoiceId = resolvedParams.invoiceId;
	return (
		<OrderPreviewContainer
			recipientInfo={recipientData}
			paymentInfo={paymentData}
			invoiceId={invoiceId}
		/>
	);
}
