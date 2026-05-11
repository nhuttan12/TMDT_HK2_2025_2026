import { InvoiceStatus } from "../invoices/user/InvoiceStatus";

export interface DashboardStatusData {
	status: InvoiceStatus;
	count: number;
}
