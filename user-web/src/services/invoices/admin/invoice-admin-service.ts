import { PaginationParams } from '@/types/common/Pagination';
import { ResponseApi } from '@/types/common/ResponseApi';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { type AxiosInstance } from 'axios';

export async function getUserInvoiceListMocking(
	pageNumber: number = 1,
	pageSize: number = 10,
): Promise<BackendPagedResult<UserInvoice>> {
	// Giả lập độ trễ mạng [cite: 1]
	return new Promise((resolve) => {
		setTimeout(() => {
			const allInvoices: UserInvoice[] = [
				{
					id: 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d',
					createdAt: '2026-03-10T10:12:00',
					status: 'pending', // Thay thế 'pending_approval' bằng 'pending' [cite: 1]
					paymentMethod: 'COD',
					totalAmount: 750000,
					totalItems: 2,
				},
				{
					id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
					createdAt: '2026-03-10T12:40:00',
					status: 'processing', // Thay thế 'paid' bằng 'processing' [cite: 1]
					paymentMethod: 'VNPAY',
					totalAmount: 1200000,
					totalItems: 3,
				},
				{
					id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
					createdAt: '2026-03-11T09:20:00',
					status: 'completed', // Giữ nguyên [cite: 1]
					paymentMethod: 'MoMo',
					totalAmount: 2100000,
					totalItems: 5,
				},
				{
					id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
					createdAt: '2026-03-11T13:15:00',
					status: 'processing', // Thay thế 'paid' bằng 'processing' [cite: 1]
					paymentMethod: 'CreditCard',
					totalAmount: 980000,
					totalItems: 2,
				},
				{
					id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
					createdAt: '2026-03-12T08:00:00',
					status: 'cancelled', // Giữ nguyên [cite: 1]
					paymentMethod: 'COD',
					totalAmount: 450000,
					totalItems: 1,
				},
				{
					id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
					createdAt: '2026-03-12T10:30:00',
					status: 'pending', // Giữ nguyên [cite: 1]
					paymentMethod: 'bank_transfer',
					totalAmount: 1800000,
					totalItems: 4,
				},
				{
					id: '07b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
					createdAt: '2026-03-12T16:45:00',
					status: 'completed', // Giữ nguyên [cite: 1]
					paymentMethod: 'MoMo',
					totalAmount: 3200000,
					totalItems: 6,
				},
				{
					id: '18c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
					createdAt: '2026-03-13T09:10:00',
					status: 'returned', // Thay thế 'paid' bằng 'returned' để dữ liệu phong phú hơn [cite: 1, 2]
					paymentMethod: 'VNPAY',
					totalAmount: 670000,
					totalItems: 2,
				},
				{
					id: '29d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
					createdAt: '2026-03-13T14:22:00',
					status: 'pending', // Giữ nguyên [cite: 2]
					paymentMethod: 'COD',
					totalAmount: 530000,
					totalItems: 1,
				},
				{
					id: '3a4b5c6d-7e8f-4a9b-0c1d-2e3f4a5b6c7d',
					createdAt: '2026-03-14T11:05:00',
					status: 'completed', // Giữ nguyên [cite: 2]
					paymentMethod: 'CreditCard',
					totalAmount: 2500000,
					totalItems: 4,
				},
			];

			// Tính toán các thông số phân trang
			const totalCount = allInvoices.length;
			const totalPages = Math.ceil(totalCount / pageSize);
			const startIndex = (pageNumber - 1) * pageSize;

			// Cắt mảng data dựa trên pageNumber và pageSize hiện tại
			const pagedItems = allInvoices.slice(startIndex, startIndex + pageSize);

			// Trả về object đúng chuẩn BackendPagedResult
			resolve({
				items: pagedItems, //
				totalCount: totalCount, //
				pageNumber: pageNumber, //
				pageSize: pageSize, //
				totalPages: totalPages, //
				hasNextPage: pageNumber < totalPages, //
				hasPreviousPage: pageNumber > 1, //
			});
		}, 500);
	});
}

/**
 * Hàm lấy chi tiết hóa đơn theo ID
 */
export async function getUserInvoiceDetailByInvoiceIdMocking(
	invoiceId: string,
): Promise<InvoiceDetail> {
	// Trong thực tế sẽ là: return get(`/api/invoices/${invoiceId}`);
	return new Promise<InvoiceDetail>((resolve) => {
		setTimeout((): void => {
			resolve({
				invoiceId: invoiceId, // Tự động lấy ID được truyền vào
				createdAt: '2026-03-12T10:20:00',
				status: 'processing',

				// Nhóm thông tin giao nhận vào object delivery
				delivery: {
					shippingStatus: 'shipping',
					recipientName: 'Nguyễn Văn A',
					recipientPhone: '0901234567',
					address: 'Quận 1, TP Hồ Chí Minh',
					shippingFee: 40000,
					trackingCode: 'GHN845923452',
					estimatedDelivery: '2026-03-17T00:00:00',
				},

				// Nhóm thông tin thanh toán vào object payment
				payment: {
					paymentMethod: 'VNPAY',
					paidAt: '2026-03-12T10:22:00',
				},

				// Mảng items giữ nguyên cấu trúc vì đã khớp với interface InvoiceItem
				items: [
					{
						productId: 101,
						variantId: 101,
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
						variantId: 102,
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
						variantId: 103,
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

				// Tổng tiền của tất cả sản phẩm cộng lại
				subTotal: 820000,

				// Số tiền được giảm trừ
				discountAmount: 100000,

				// Tổng thanh toán cuối cùng
				grandTotal: 760000,
			});
		}, 500);
	});
}

export class InvoiceAdminService {
	constructor(private api: AxiosInstance) {}

	async getUserInvoiceList(
		pagingParam?: PaginationParams,
	): Promise<BackendPagedResult<UserInvoice>> {
		try {
			const flatParams = {
				...pagingParam,
			};
			const response = await this.api.get<ResponseApi<BackendPagedResult<UserInvoice>>>(
				`/admin/invoices`,
				{
					params: flatParams,
				},
			);

			console.log('invoices data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				return await getUserInvoiceListMocking();
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getUserInvoiceListMocking();
		}
	}

	async getUserInvoiceDetailByInvoiceId(invoiceId: string): Promise<InvoiceDetail> {
		try {
			const response = await this.api.get<ResponseApi<InvoiceDetail>>(
				`/admin/invoices/${invoiceId}/detail`,
			);

			console.log('invoices data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				return await getUserInvoiceDetailByInvoiceIdMocking(invoiceId);
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getUserInvoiceDetailByInvoiceIdMocking(invoiceId);
		}
	}

	async approveInvoice(invoiceId: string): Promise<string> {
		try {
			const flatParams = {
				invoiceId: invoiceId,
			};
			const response = await this.api.patch<ResponseApi<string>>(
				`/admin/invoices`,
				flatParams,
			);

			console.log('invoices data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				return '';
			}

			return '';
		} catch (error: unknown) {
			console.error(error);
			return '';
		}
	}
}
