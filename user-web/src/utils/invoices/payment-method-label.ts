import { PaymentMethod } from '@/types/invoices/user/PaymentMethod';

const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
	COD: 'Thanh toán khi nhận hàng',
	VNPAY: 'VNPAY',
	MoMo: 'Ví MoMo',
	CREDIT_CARD: 'Thẻ tín dụng',
	BANK_TRANSFER: 'Chuyển khoản ngân hàng',
};

export function getPaymentMethodLabel(method: PaymentMethod): string {
	return PAYMENT_METHOD_LABEL[method] ?? 'Không xác định';
}