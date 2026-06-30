'use client';

import { useOrderPreviewLogic } from '@/hooks/carts/use-checkout-preview-logic';
import { PaymentInfo } from '@/types/invoices/user/PaymentInfo';
import { RecipientInfo } from '@/types/invoices/user/RecipientInfo';
import { JSX } from 'react';
import OrderPreviewUI from './order-preview-ui';

interface OrderPreviewContainerProps {
	recipientInfo: RecipientInfo;
	paymentInfo: PaymentInfo;
}

export default function OrderPreviewContainer({
	recipientInfo,
	paymentInfo,
}: OrderPreviewContainerProps): JSX.Element {
	const logic = useOrderPreviewLogic();

	return (
		<OrderPreviewUI
			{...logic}
			recipientInfo={recipientInfo}
			paymentInfo={paymentInfo}
		/>
	);
}
