export interface InvoiceItem {
	productId: number;
	productName: string;
	imageUrl: string;
	price: number;
	quantity: number;
	discount?: number;
	subTotal: number;
	totalPrice: number;
}
