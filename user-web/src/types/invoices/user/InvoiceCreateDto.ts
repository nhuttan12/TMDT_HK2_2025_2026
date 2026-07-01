import { CartItem } from '@/types/carts/CartItem';

export interface InvoiceItem {
	variantId: string;
	quantity: number;
}

export interface InvoiceRequestBody {
	items: InvoiceItem[];
	deliveryRequest: {
		address: string;
		receiverName: string;
		shippingFee: number;
	};
}

/**
 * Hàm tạo Request Body cho API /api/invoices
 */
 export  function createInvoiceRequestBody(
	itemsList: CartItem[],
	deliveryInfo: { address: string; receiverName: string; shippingFee: number },
): InvoiceRequestBody {
	// 1. Map mảng selectedItems sang định dạng API yêu cầu
	const formattedItems = itemsList.map((item) => ({
		// Nếu trong selectedItems có variantId thì lấy, không thì fallback về productId
		variantId: item.productId,
		quantity: item.quantity,
	}));

	// 2. Trả về cấu trúc body hoàn chỉnh đúng với Swagger
	return {
		items: formattedItems,
		deliveryRequest: {
			address: deliveryInfo.address,
			receiverName: deliveryInfo.receiverName,
			shippingFee: deliveryInfo.shippingFee,
		},
	};
}
