import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';

export async function getInvoiceDetailByInvoiceId(invoiceId: number): Promise<InvoiceDetail> {
	// Giả lập độ trễ mạng 800ms.
	// Trong thực tế, bạn sẽ truyền tham số invoiceId vào API fetch ở đây.
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				// Ép kiểu ID về số nếu API yêu cầu, ở đây mock tĩnh tạm thời
				invoiceId: invoiceId,
				createdAt: '2026-02-20T10:15:00Z',
				paidAt: '2026-02-20T10:17:32Z',
				completedAt: '2026-02-23T15:45:00Z',
				status: 'completed',
				shippingStatus: 'delivered',
				paymentMethod: 'bank_transfer',
				recipientName: 'Nguyễn Nhựt Tân',
				recipientPhone: '0901234567',
				address: '123 Lý Thường Kiệt, Quận 10, TP.HCM',
				items: [
					{
						productId: 11,
						productName: 'Tai nghe Bluetooth Sony WH-1000XM5',
						imageUrl: '/images/products/sony-wh1000xm5.jpg',
						price: 7500000,
						quantity: 1,
						subTotal: 7500000,
						discount: 500000,
						totalPrice: 7000000,
					},
					{
						productId: 25,
						productName: 'Chuột Logitech MX Master 3S',
						imageUrl: '/images/products/logitech-mx-master-3s.jpg',
						price: 2900000,
						quantity: 1,
						subTotal: 2900000,
						discount: 200000,
						totalPrice: 2700000,
					},
				],
				subTotal: 10400000,
				shippingFee: 30000,
				discountAmount: 700000,
				grandTotal: 9730000,
				trackingCode: 'GHN123456789VN',
				estimatedDelivery: '2026-02-23T18:00:00Z',
			});
		}, 800);
	});
}

export async function getUserInvoicesByUserId(userId: number): Promise<UserInvoice[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					createdAt: '2026-02-15T10:30:00',
					status: 'paid', // Đã sửa lại đúng chữ thường theo Type
					paymentMethod: 'Chuyển khoản ngân hàng',
					totalAmount: 1250000,
					totalItems: 3,
				},
				{
					id: 2,
					createdAt: '2026-02-14T14:12:00',
					status: 'pending',
					paymentMethod: 'Thanh toán khi nhận hàng (COD)',
					totalAmount: 780000,
					totalItems: 2,
				},
				{
					id: 3,
					createdAt: '2026-02-12T09:45:00',
					status: 'cancelled',
					paymentMethod: 'Ví MoMo',
					totalAmount: 450000,
					totalItems: 1,
				},
				{
					id: 4,
					createdAt: '2026-02-10T16:20:00',
					status: 'paid',
					paymentMethod: 'Thẻ tín dụng',
					totalAmount: 2350000,
					totalItems: 4,
				},
				{
					id: 5,
					createdAt: '2026-02-08T11:05:00',
					status: 'paid',
					paymentMethod: 'Chuyển khoản ngân hàng',
					totalAmount: 990000,
					totalItems: 2,
				},
			]);
		}, 500);
	});
}
