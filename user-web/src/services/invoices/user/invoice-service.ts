import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

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

export async function getUserInvoicesByUserId(
	userId: string,
	{ page = 1, limit = 10 }: PaginationRequest = {},
): Promise<PaginationResponse<UserInvoice>> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const mockData: UserInvoice[] = [
				{
					id: '550e8400-e29b-41d4-a716-446655440001',
					createdAt: '2026-02-15T10:30:00',
					status: 'paid',
					paymentMethod: 'bank_transfer',
					totalAmount: 1250000,
					totalItems: 3,
				},
				{
					id: '123e4567-e89b-12d3-a456-426614174002',
					createdAt: '2026-02-14T14:12:00',
					status: 'pending',
					paymentMethod: 'COD',
					totalAmount: 780000,
					totalItems: 2,
				},
				{
					id: '987e6543-e21b-34d3-b456-426614174003',
					createdAt: '2026-02-12T09:45:00',
					status: 'cancelled',
					paymentMethod: 'MoMo',
					totalAmount: 450000,
					totalItems: 1,
				},
				{
					id: '111e2222-e33b-44d3-c456-426614174004',
					createdAt: '2026-02-10T16:20:00',
					status: 'paid',
					paymentMethod: 'credit_card',
					totalAmount: 2350000,
					totalItems: 4,
				},
				{
					id: '333e4444-e55b-66d3-d456-426614174005',
					createdAt: '2026-02-08T11:05:00',
					status: 'paid',
					paymentMethod: 'bank_transfer',
					totalAmount: 990000,
					totalItems: 2,
				},
			];

			// Bọc dữ liệu vào dạng PaginationResponse
			resolve({
				data: mockData,
				meta: {
					totalItems: 5, // Tổng số item giả lập
					totalPages: Math.ceil(5 / limit),
					currentPage: page,
					itemsPerPage: limit,
				},
			});
		}, 500);
	});
}
