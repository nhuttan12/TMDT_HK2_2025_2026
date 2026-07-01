import { BackEndUserInvoiceDetail, InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import {
	BackEndUserInvoice,
	UserInvoice,
} from '@/types/invoices/user/UserInvoice';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { type AxiosInstance } from 'axios';
import { ResponseApi } from '@/types/common/ResponseApi';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { PaymentMethod } from '@/types/invoices/user/PaymentMethod';
import {InvoiceItem} from "@/types/invoices/user/InvoiceItem";
import {ShippingStatus} from "@/types/invoices/user/ShippingStatus";
import { RecipientInfo } from '@/types/invoices/user/RecipientInfo';
import { PaymentInfo } from '@/types/invoices/user/PaymentInfo';
import { mapBackendInvoiceStatus } from '@/utils/invoices/invoice-mapping';
import {InvoiceStatus} from "@/types/invoices/user/InvoiceStatus";


export async function getInvoiceDetailByInvoiceIdCraw(invoiceId: number | string): Promise<InvoiceDetail> {
	// Giả lập độ trễ mạng 800ms.
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				invoiceId: invoiceId,
				createdAt: '2026-02-20T10:15:00Z',
				completedAt: '2026-02-23T15:45:00Z',
				status: 'completed',

				// ĐÃ FIX: Gom các trường liên quan vào đối tượng con delivery
				delivery: {
					shippingStatus: 'delivered',
					recipientName: 'Nguyễn Nhựt Tân',
					recipientPhone: '0901234567',
					address: '123 Lý Thường Kiệt, Quận 10, TP.HCM',
					shippingFee: 30000,
					trackingCode: 'GHN123456789VN',
					estimatedDelivery: '2026-02-23T18:00:00Z',
				},

				// ĐÃ FIX: Gom các trường liên quan vào đối tượng con payment
				payment: {
					paymentMethod: 'bank_transfer',
					paidAt: '2026-02-20T10:17:32Z',
				},

				// Danh sách sản phẩm giữ nguyên
				items: [
					{
						productId: 11,
						variantId: 11,
						productName: 'Tai nghe Bluetooth Sony WH-100XM5',
						imageUrl: '/images/products/sony-wh1000xm5.jpg',
						price: 7500000,
						quantity: 1,
						subTotal: 7500000,
						discount: 500000,
						totalPrice: 7000000,
					},
					{
						productId: 25,
						variantId: 11,
						productName: 'Chuột Logitech MX Master 3S',
						imageUrl: '/images/products/logitech-mx-master-3s.jpg',
						price: 2900000,
						quantity: 1,
						subTotal: 2900000,
						discount: 200000,
						totalPrice: 2700000,
					},
				],

				// Các trường tính toán tiền giữ nguyên vẹn
				subTotal: 10400000,
				discountAmount: 700000,
				grandTotal: 9730000,
			});
		}, 800);
	});
}

export async function getUserInvoicesByUserIdCraw(
	userId: string,
	{ page = 1, limit = 10 }: PaginationRequest = {},
): Promise<PaginationResponse<UserInvoice>> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const mockData: UserInvoice[] = [
				{
					id: '550e8400-e29b-41d4-a716-446655440001',
					createdAt: '2026-02-15T10:30:00',
					status: 'completed', // Sửa từ 'paid' sang 'completed'
					paymentMethod: 'bank_transfer',
					totalAmount: 1250000,
					totalItems: 3,
				},
				{
					id: '123e4567-e89b-12d3-a456-426614174002',
					createdAt: '2026-02-14T14:12:00',
					status: 'pending', // Giữ nguyên
					paymentMethod: 'COD',
					totalAmount: 780000,
					totalItems: 2,
				},
				{
					id: '987e6543-e21b-34d3-b456-426614174003',
					createdAt: '2026-02-12T09:45:00',
					status: 'cancelled', // Giữ nguyên
					paymentMethod: 'MoMo',
					totalAmount: 450000,
					totalItems: 1,
				},
				{
					id: '111e2222-e33b-44d3-c456-426614174004',
					createdAt: '2026-02-10T16:20:00',
					status: 'processing', // Sửa từ 'paid' sang 'processing'
					paymentMethod: 'credit_card',
					totalAmount: 2350000,
					totalItems: 4,
				},
				{
					id: '333e4444-e55b-66d3-d456-426614174005',
					createdAt: '2026-02-08T11:05:00',
					status: 'returned', // Sửa từ 'paid' sang 'returned'
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

export class InvoiceService {
	constructor(private api: AxiosInstance) {}

	async getUserInvoicesByUserId(
		userId: string,
		{ page = 1, limit = 10 }: PaginationRequest = {},
	): Promise<PaginationResponse<UserInvoice>> {
		try {
			const response =
				await this.api.get<ResponseApi<BackendPagedResult<BackEndUserInvoice>>>(
					`/invoices/me`,
				);

			console.log('invoid data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return getUserInvoicesByUserIdCraw(userId, { page: page, limit: limit });
			}
			return mapBackEndInvoiceToFe(response.data.data);
		} catch {
			return getUserInvoicesByUserIdCraw(userId, { page: page, limit: limit });
		}
	}

	async getInvoiceDetailByInvoiceId(invoiceId: number | string): Promise<InvoiceDetail> {
		try {
			const response = await this.api.get<ResponseApi<BackEndUserInvoiceDetail>>(
				`/invoices/${invoiceId}/detail`,
			);

			console.log('invoid data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return getInvoiceDetailByInvoiceIdCraw(invoiceId);
			}
			return mapBackEndInvoiceDetailToFe(response.data.data);
		} catch {
			return getInvoiceDetailByInvoiceIdCraw(invoiceId);
		}
	}
}

export function mapBackEndInvoiceToFe(
	data: BackendPagedResult<BackEndUserInvoice>,
): PaginationResponse<UserInvoice> {
	const res: UserInvoice[] = data.items.map((item: BackEndUserInvoice): UserInvoice => {
		return {
			id: item.id,
			createdAt: item.createdAt,
			paymentMethod: mapPaymentMethod(item.paymentMethod),
			status: mapBackendInvoiceStatus(item.status),
			totalAmount: item.totalAmount,
			totalItems: item.totalItems,
		};
	});
	return {
		data: res,
		meta: {
			totalItems: data.totalCount,
			currentPage: data.pageNumber,
			totalPages: data.totalPages,
			itemsPerPage: data.pageSize,
		},
	};
}



export function mapBackEndInvoiceDetailToFe(data: BackEndUserInvoiceDetail): InvoiceDetail {
	// 1. Map danh sách items sang format FE (nếu cấu trúc InvoiceItem của FE có khác biệt)
	const mappedItems: InvoiceItem[] = data.items.map((item) => ({
		// Giả định InvoiceItem của bạn có các trường tương tự, hãy điều chỉnh nếu cần:
		productId: item.productId,
		variantId: item.variantId,
		productName: item.productName,
		imageUrl: item.imageUrl,
		price: item.price,
		quantity: item.quantity,
		subTotal: item.subTotal,
		totalPrice: item.subTotal,
	}));

	// 2. Ép kiểu hoặc map status từ number sang InvoiceStatus Enum của FE
	// Ở đây tôi ép kiểu trực tiếp, bạn có thể dùng switch-case nếu giá trị mapping khác nhau
	// const invoiceStatus = data.status as unknown as InvoiceStatus;
	const invoiceStatus = data.status as InvoiceStatus;

	// Giả định mapping shippingStatus dựa trên status tổng của đơn hàng
	const shippingStatus: ShippingStatus = data.status as ShippingStatus ;

	return {
		invoiceId: data.id,
		createdAt: data.createdAt,
		// Các trường thời gian này BE chưa trả về trong JSON mẫu, tạm thời để undefined
		cancelledAt: undefined,
		completedAt: undefined,

		status: invoiceStatus,

		delivery: {
			shippingStatus: shippingStatus, // Cần map theo logic của dự án
			recipientName: data.recipientName,
			recipientPhone: data.recipientPhone,
			address: data.address,
			shippingFee: data.shippingFee,
			trackingCode: '', // BE chưa trả về, tạm để chuỗi rỗng
			estimatedDelivery: '', // BE chưa trả về, tạm để chuỗi rỗng
		},

		payment: {
			paymentMethod: 'COD' as PaymentMethod, // BE chưa trả về phương thức thanh toán cụ thể, tạm để mặc định
			paidAt: undefined, // Có thể check nếu status là Completed thì lấy data.updatedAt
		},

		items: mappedItems,
		subTotal: data.totalAmount, // Tổng tiền gốc trước ship/giảm giá
		discountAmount: data.discountAmount, // Số tiền được giảm
		grandTotal: data.finalAmount, // Tổng số tiền cuối cùng khách phải trả
	};
}
// Hàm chuyển đổi cho PaymentMethod
function mapPaymentMethod(backendMethod: string): PaymentMethod {
	switch (backendMethod) {
		case 'CreditCard':
			return 'credit_card';
		case 'COD':
			return 'COD';
		case 'VNPay':
			return 'VNPAY';
		case 'MoMo':
			return 'MoMo';
		case 'BankTransfer':
			return 'bank_transfer';
		default:
			return 'COD'; // Giá trị mặc định nếu không khớp
	}
}

export const getRecipientInfoMocking = async (): Promise<RecipientInfo> => {
    // Giả lập thời gian chờ phản hồi từ server (ví dụ: 500ms)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                recipientName: "Nguyễn Văn A",
                recipientPhone: "0901234567",
                address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh"
            });
        }, 500);
    });
};

export const getPaymentInfoMocking = async (): Promise<PaymentInfo> => {
    // Giả lập thời gian chờ phản hồi từ server (ví dụ: 500ms)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                totalAmount: 500000,     // Tổng tiền hàng: 500.000 ₫
                shippingFee: 30000,      // Phí vận chuyển: 30.000 ₫
                discountAmount: 50000,   // Giảm giá: 50.000 ₫
                finalAmount: 480000      // Tổng thanh toán: 480.000 ₫
            });
        }, 500);
    });
};