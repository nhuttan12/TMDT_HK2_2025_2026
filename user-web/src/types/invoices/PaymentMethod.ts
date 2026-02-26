export type PaymentMethod = 'COD' | 'VNPAY' | 'MoMo' | 'CREDIT_CARD' | 'BANK_TRANSFER';

export function getPaymentMethodLabel(method: PaymentMethod): string {
	switch (method) {
		case 'COD':
			return 'Thanh toán khi nhận hàng';
		case 'VNPAY':
			return 'VNPAY';
		case 'MoMo':
			return 'Ví MoMo';
		case 'CREDIT_CARD':
			return 'Thẻ tín dụng';
		case 'BANK_TRANSFER':
			return 'Chuyển khoản ngân hàng';
		default:
			return 'Không xác định';
	}
}