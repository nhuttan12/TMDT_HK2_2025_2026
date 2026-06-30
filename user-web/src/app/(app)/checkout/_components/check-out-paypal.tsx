'use client';

import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CreateOrderActions, OnApproveActions } from '@paypal/paypal-js';
import { JSX } from 'react';

interface CheckoutPaypalProps {
	totalAmount: string;
}

export function CheckoutPaypal({ totalAmount }: CheckoutPaypalProps): JSX.Element {
	const initialOptions = {
		clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
		currency: 'USD', // Sandbox thường chuộng USD để test
		intent: 'capture',
	};

	const handleCreateOrder = (data: Record<string, unknown>, actions: CreateOrderActions): Promise<string> => {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: totalAmount,
					},
				},
			],
		});
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleApprove = (data: Record<string, unknown>, actions: any): Promise<void> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return actions.order.capture().then((details: any) => {
			console.log('Thanh toán thành công bởi:', details.payer.name.given_name);
			alert('Thanh toán thành công!');
		});
	};

	return (
		<div className='w-full max-w-md rounded-lg border bg-background p-6 shadow-sm'>
			<h2 className='mb-4 text-xl font-bold'>Thanh toán an toàn</h2>
			<PayPalScriptProvider options={initialOptions}>
				<PayPalButtons
					createOrder={handleCreateOrder}
					onApprove={handleApprove}
					style={{ layout: 'vertical', shape: 'rect' }}
				/>
			</PayPalScriptProvider>
		</div>
	);
}