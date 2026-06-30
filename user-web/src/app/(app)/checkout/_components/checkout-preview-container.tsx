'use client';
import { JSX } from 'react';
import CheckoutPreviewUI from '@/app/(app)/checkout/_components/checkout-preview-ui';
import {
	CheckoutLogicReturn,
	useCheckoutPreviewLogic,
} from '@/hooks/carts/use-checkout-preview-logic';

export default function CheckoutPreviewContainer(): JSX.Element {
	const logic: CheckoutLogicReturn = useCheckoutPreviewLogic();

	return <CheckoutPreviewUI {...logic} />;
}
