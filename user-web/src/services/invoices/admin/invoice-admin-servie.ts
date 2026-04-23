import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';

export async function getUserInvoiceList(): Promise<UserInvoice[]> {
	// Giả lập độ trễ mạng
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						id: 1001,
						createdAt: '2026-03-10T10:12:00',
						status: 'pending_approval',
						paymentMethod: 'COD',
						totalAmount: 750000,
						totalItems: 2,
					},
					{
						id: 1002,
						createdAt: '2026-03-10T12:40:00',
						status: 'paid',
						paymentMethod: 'VNPAY',
						totalAmount: 1200000,
						totalItems: 3,
					},
					{
						id: 1003,
						createdAt: '2026-03-11T09:20:00',
						status: 'completed',
						paymentMethod: 'MoMo',
						totalAmount: 2100000,
						totalItems: 5,
					},
					{
						id: 1004,
						createdAt: '2026-03-11T13:15:00',
						status: 'paid',
						paymentMethod: 'CREDIT_CARD',
						totalAmount: 980000,
						totalItems: 2,
					},
					{
						id: 1005,
						createdAt: '2026-03-12T08:00:00',
						status: 'cancelled',
						paymentMethod: 'COD',
						totalAmount: 450000,
						totalItems: 1,
					},
					{
						id: 1006,
						createdAt: '2026-03-12T10:30:00',
						status: 'pending',
						paymentMethod: 'BANK_TRANSFER',
						totalAmount: 1800000,
						totalItems: 4,
					},
					{
						id: 1007,
						createdAt: '2026-03-12T16:45:00',
						status: 'completed',
						paymentMethod: 'MoMo',
						totalAmount: 3200000,
						totalItems: 6,
					},
					{
						id: 1008,
						createdAt: '2026-03-13T09:10:00',
						status: 'paid',
						paymentMethod: 'VNPAY',
						totalAmount: 670000,
						totalItems: 2,
					},
					{
						id: 1009,
						createdAt: '2026-03-13T14:22:00',
						status: 'pending',
						paymentMethod: 'COD',
						totalAmount: 530000,
						totalItems: 1,
					},
					{
						id: 1010,
						createdAt: '2026-03-14T11:05:00',
						status: 'completed',
						paymentMethod: 'CREDIT_CARD',
						totalAmount: 2500000,
						totalItems: 4,
					},
				]),
			500,
		);
	});
}

/**
 * Hàm lấy chi tiết hóa đơn theo ID
 */
export async function getUserInvoiceDetailByInvoiceId(invoiceId: number): Promise<InvoiceDetail> {
	// Trong thực tế sẽ là: return get(`/api/invoices/${invoiceId}`);
	return new Promise<InvoiceDetail>((resolve) => {
		setTimeout((): void => {
			resolve({
				invoiceId: 1024,
				createdAt: '2026-03-12T10:20:00',
				paidAt: '2026-03-12T10:22:00',
				status: 'paid',
				shippingStatus: 'shipping',
				paymentMethod: 'VNPAY',
				recipientName: 'Nguyễn Văn A',
				recipientPhone: '0901234567',
				address: 'Quận 1, TP Hồ Chí Minh',
				trackingCode: 'GHN845923452',
				estimatedDelivery: '2026-03-17T00:00:00',
				items: [
					{
						productId: 1,
						productName: 'Mechanical Keyboard RK84',
						imageUrl:
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJY_rdiAA2nRvjtwKfi_mz4VB9_GlS7wGVcg&s',
						price: 1200000,
						quantity: 1,
						discount: 100000,
						subTotal: 1200000,
						totalPrice: 1100000,
					},
					// ... các sản phẩm khác
				],
				subTotal: 3700000,
				shippingFee: 30000,
				discountAmount: 300000,
				grandTotal: 3430000,
			});
		}, 500);
	});
}
