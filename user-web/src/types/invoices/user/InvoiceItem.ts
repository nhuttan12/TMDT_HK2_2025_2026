export interface InvoiceItem {
	productId: number | string;
	variantId: number | string;
	productName: string;
	imageUrl: string;
	price: number;
	quantity: number;
	discount?: number;
	subTotal: number;
	totalPrice: number;
}
