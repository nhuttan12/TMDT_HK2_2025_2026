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
						paymentMethod: 'credit_card',
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
						paymentMethod: 'bank_transfer',
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
						paymentMethod: 'credit_card',
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
				invoiceId: invoiceId, // Tự động lấy ID được truyền vào
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
						productId: 101,
						productName: 'Bể Terrarium Trụ Tròn Size M',
						imageUrl:
							'https://bizweb.dktcdn.net/100/181/287/files/ho-kho-bau.jpg?v=1694160724978',
						price: 550000,
						quantity: 1,
						discount: 50000,
						subTotal: 550000,
						totalPrice: 500000,
					},
					{
						productId: 102,
						productName: 'Cây Cẩm Nhung Fittonia Đỏ (Chậu Mini)',
						imageUrl:
							'https://lanhatreehouse.com/wp-content/uploads/2024/06/cay-cam-nhung-la-do.jpg',
						price: 35000,
						quantity: 2,
						discount: 0,
						subTotal: 70000,
						totalPrice: 70000,
					},
					{
						productId: 103,
						productName: 'Đèn LED Quang Phổ Chiếu Sáng Bể Kính',
						imageUrl:
							'https://images.congtydenled.com.vn/haledco/2022/03/den-led-ho-ca-mini.jpg',
						price: 200000,
						quantity: 1,
						discount: 20000,
						subTotal: 200000,
						totalPrice: 180000,
					},
				],
				// Tổng cộng tiền hàng (550k + 70k + 200k)
				subTotal: 820000,
				// Phí vận chuyển hàng dễ vỡ
				shippingFee: 40000,
				// Tổng giảm giá (50k bể + 20k đèn + 30k voucher áp dụng thêm)
				discountAmount: 100000,
				// Tổng thanh toán (820k + 40k - 100k)
				grandTotal: 760000,
			});
		}, 500);
	});
}
