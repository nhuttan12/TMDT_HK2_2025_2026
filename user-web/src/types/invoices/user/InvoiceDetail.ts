import { InvoiceItem } from './InvoiceItem';
import { InvoiceStatus } from './InvoiceStatus';
import { PaymentMethod } from './PaymentMethod';
import { ShippingStatus } from './ShippingStatus';

export interface InvoiceDetail {
	/** Mã định danh duy nhất của hóa đơn (ID tăng tự động từ hệ thống) */
	invoiceId: number | string;

	/** Ngày và giờ khởi tạo hóa đơn (Chuỗi định dạng ISO, ví dụ: UTC string) */
	createdAt: string;

	/** Ngày và giờ hóa đơn bị hủy (Có thể undefined nếu đơn chưa từng bị hủy) */
	cancelledAt?: string;

	/** Ngày và giờ hóa đơn hoàn thành toàn bộ chu trình giao-nhận (Có thể undefined nếu chưa xong) */
	completedAt?: string;

	/** Trạng thái xử lý nội tại của hóa đơn (Ví dụ: Pending, Processing, Completed, Cancelled) */
	status: InvoiceStatus;

	/** Đối tượng chứa thông tin chi tiết về vận chuyển và địa chỉ giao nhận */
	delivery: DeliveryDetail;

	/** Đối tượng chứa thông tin chi tiết về phương thức và thời gian thanh toán */
	payment: PaymentDetail;

	/** Mảng danh sách các sản phẩm/biến thể nằm trong hóa đơn này */
	items: InvoiceItem[];

	/** Tổng tiền của tất cả sản phẩm cộng lại (Giá gốc trước khi tính phí ship và giảm giá) */
	subTotal: number;

	/** Số tiền được giảm trừ (Trừ đi từ giá trị Coupon, Voucher khuyến mãi nếu có) */
	discountAmount: number;

	/** Tổng số tiền cuối cùng khách hàng phải trả (Công thức: subTotal + shippingFee - discountAmount) */
	grandTotal: number;
}

export interface DeliveryDetail {
	/** Trạng thái tiến độ vận chuyển (Ví dụ: Chờ lấy hàng, Đang giao, Đã giao, Thất bại) */
	shippingStatus: ShippingStatus;

	/** Họ và tên đầy đủ của người nhận hàng */
	recipientName: string;

	/** Số điện thoại liên hệ trực tiếp của người nhận hàng */
	recipientPhone: string;

	/** Địa chỉ chi tiết cụ thể dùng để giao hàng (Số nhà, đường, phường, quận, tỉnh thành) */
	address: string;

	/** Phí dịch vụ vận chuyển phát sinh cho đơn hàng */
	shippingFee: number;

	/** Mã định danh tra cứu bưu kiện (Mã Tracking Bill cung cấp bởi đơn vị vận chuyển như GHTK, GHN...) */
	trackingCode: string;

	/** Ngày dự kiến đơn hàng sẽ được giao đến tay người nhận */
	estimatedDelivery: string;
}

export interface PaymentDetail {
	/** Phương thức thực hiện thanh toán (Ví dụ: 'COD', 'VNPAY', 'MoMo', 'credit_card', 'bank_transfer') */
	paymentMethod: PaymentMethod;

	/** Ngày và giờ giao dịch thanh toán được xác nhận thành công (Có thể undefined nếu là COD hoặc chưa thanh toán) */
	paidAt?: string;
}

export interface BackEndInvoiceItem {
	productId: string;
	variantId: string;
	productName: string;
	imageUrl: string;
	price: number;
	quantity: number;
	subTotal: number;
}

export interface BackEndUserInvoiceDetail {
	id: string;
	userId: string;
	couponId: string | null;
	items: BackEndInvoiceItem[];
	totalAmount: number;
	finalAmount: number;
	status: string; // Ví dụ: 2 tương ứng với trạng thái nào đó trong InvoiceStatus
	recipientName: string;
	recipientPhone: string;
	address: string;
	shippingFee: number;
	discountAmount: number;
	createdAt: string;
	updatedAt: string;
}

// export interface InvoiceDetail {
// 	invoiceId: number;
// 	createdAt: string;
//
// 	paidAt?: string;
// 	cancelledAt?: string;
// 	completedAt?: string;
//
// 	status: InvoiceStatus;
// 	shippingStatus: ShippingStatus;
//
// 	paymentMethod: PaymentMethod;
//
// 	recipientName: string;
// 	recipientPhone: string;
// 	address: string;
//
// 	items: InvoiceItem[];
//
// 	subTotal: number;
// 	shippingFee: number;
// 	discountAmount: number;
// 	grandTotal: number;
//
// 	trackingCode: string;
// 	estimatedDelivery: string;
// }