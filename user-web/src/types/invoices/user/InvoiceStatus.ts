export type InvoiceStatus =
	| 'pending_approval'
	| 'pending'
	| 'paid'
	| 'shipping'
	| 'delivered'
	| 'cancelled'
	| 'completed'
    | 'returned';
