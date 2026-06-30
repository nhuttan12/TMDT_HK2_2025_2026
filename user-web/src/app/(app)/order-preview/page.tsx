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

export default async function Page(): Promise<JSX.Element> {
	const [recipientData, paymentData] = await Promise.all([
		getRecipientInfoMocking(),
		getPaymentInfoMocking(),
	]);

	return (
		<OrderPreviewContainer
			recipientInfo={recipientData}
			paymentInfo={paymentData}
		/>
	);
}
