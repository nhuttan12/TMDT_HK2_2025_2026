import { InvoiceStatus } from "./InvoiceStatus";

export interface UserInvoice {
	invoiceID: number;
	createdAt: string;

	status: InvoiceStatus;
	paymentMethod: string;
    
	totalAmount: number;
	totalItems: number;
}
