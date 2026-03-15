export interface InvoiceItem {
	productID: number;
	productName: string;
	imageUrl: string;
	price: number;
	quantity: number;
	discount?: number;
	subTotal: number;
	totalPrice: number;
}
