import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import UserInvoicesClient from './_components/user-invoices-client';

const mockInvoices: UserInvoice[] = [
	{
		id: 1,
		createdAt: '2026-02-15T10:30:00',
		status: 'PAID',
		paymentMethod: 'Chuyển khoản ngân hàng',
		totalAmount: 1250000,
		totalItems: 3,
	},
	{
		id: 2,
		createdAt: '2026-02-14T14:12:00',
		status: 'PENDING',
		paymentMethod: 'Thanh toán khi nhận hàng (COD)',
		totalAmount: 780000,
		totalItems: 2,
	},
	{
		id: 3,
		createdAt: '2026-02-12T09:45:00',
		status: 'CANCELLED',
		paymentMethod: 'Ví MoMo',
		totalAmount: 450000,
		totalItems: 1,
	},
	{
		id: 4,
		createdAt: '2026-02-10T16:20:00',
		status: 'PAID',
		paymentMethod: 'Thẻ tín dụng',
		totalAmount: 2350000,
		totalItems: 4,
	},
	{
		id: 5,
		createdAt: '2026-02-08T11:05:00',
		status: 'PAID',
		paymentMethod: 'Chuyển khoản ngân hàng',
		totalAmount: 990000,
		totalItems: 2,
	},
];

export default async function InvoicesPage() {
	// TODO: Call API
	// TODO: const invoices = await getUserInvoices();

	return <UserInvoicesClient invoices={mockInvoices} />;
}
