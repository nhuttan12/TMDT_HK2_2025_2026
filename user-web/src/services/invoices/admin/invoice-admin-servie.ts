import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';

export async function getUserInvoiceList(): Promise<UserInvoice[]> {
	// Giả lập độ trễ mạng
	return new Promise((resolve) => {
		setTimeout(
			() =>
				resolve([
					{
						id: 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', // Đã chuyển sang GUID string
						createdAt: '2026-03-10T10:12:00',
						status: 'pending_approval',
						paymentMethod: 'COD',
						totalAmount: 750000,
						totalItems: 2,
					},
					{
						id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
						createdAt: '2026-03-10T12:40:00',
						status: 'paid',
						paymentMethod: 'VNPAY',
						totalAmount: 1200000,
						totalItems: 3,
					},
					{
						id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
						createdAt: '2026-03-11T09:20:00',
						status: 'completed',
						paymentMethod: 'MoMo',
						totalAmount: 2100000,
						totalItems: 5,
					},
					{
						id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
						createdAt: '2026-03-11T13:15:00',
						status: 'paid',
						paymentMethod: 'credit_card',
						totalAmount: 980000,
						totalItems: 2,
					},
					{
						id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
						createdAt: '2026-03-12T08:00:00',
						status: 'cancelled',
						paymentMethod: 'COD',
						totalAmount: 450000,
						totalItems: 1,
					},
					{
						id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
						createdAt: '2026-03-12T10:30:00',
						status: 'pending',
						paymentMethod: 'bank_transfer',
						totalAmount: 1800000,
						totalItems: 4,
					},
					{
						id: '07b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
						createdAt: '2026-03-12T16:45:00',
						status: 'completed',
						paymentMethod: 'MoMo',
						totalAmount: 3200000,
						totalItems: 6,
					},
					{
						id: '18c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
						createdAt: '2026-03-13T09:10:00',
						status: 'paid',
						paymentMethod: 'VNPAY',
						totalAmount: 670000,
						totalItems: 2,
					},
					{
						id: '29d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
						createdAt: '2026-03-13T14:22:00',
						status: 'pending',
						paymentMethod: 'COD',
						totalAmount: 530000,
						totalItems: 1,
					},
					{
						id: '3a4b5c6d-7e8f-4a9b-0c1d-2e3f4a5b6c7d',
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
