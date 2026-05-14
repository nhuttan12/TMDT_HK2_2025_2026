import { PaymentMethod } from '@/types/invoices/user/PaymentMethod';

const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
	COD: 'Thanh toán khi nhận hàng',
	VNPAY: 'VNPAY',
	MoMo: 'Ví MoMo',
	credit_card: 'Thẻ tín dụng',
	bank_transfer: 'Chuyển khoản ngân hàng',
};

export function getPaymentMethodLabel(method: PaymentMethod): string {
	return PAYMENT_METHOD_LABEL[method] ?? 'Không xác định';
}