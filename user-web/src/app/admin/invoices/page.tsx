import { JSX } from 'react';
import InvoiceAdminPageClient from '@/app/admin/invoices/_components/invoice-admin-page-client';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';

const mockInvoices: UserInvoice[] = [
	{
		invoiceID: 1001,
		createdAt: '2026-03-10T10:12:00',
		status: 'PENDING',
		paymentMethod: 'COD',
		totalAmount: 750000,
		totalItems: 2,
	},
	{
		invoiceID: 1002,
		createdAt: '2026-03-10T12:40:00',
		status: 'PAID',
		paymentMethod: 'VNPAY',
		totalAmount: 1200000,
		totalItems: 3,
	},
	{
		invoiceID: 1003,
		createdAt: '2026-03-11T09:20:00',
		status: 'COMPLETED',
		paymentMethod: 'MoMo',
		totalAmount: 2100000,
		totalItems: 5,
	},
	{
		invoiceID: 1004,
		createdAt: '2026-03-11T13:15:00',
		status: 'PAID',
		paymentMethod: 'CREDIT_CARD',
		totalAmount: 980000,
		totalItems: 2,
	},
	{
		invoiceID: 1005,
		createdAt: '2026-03-12T08:00:00',
		status: 'CANCELLED',
		paymentMethod: 'COD',
		totalAmount: 450000,
		totalItems: 1,
	},
	{
		invoiceID: 1006,
		createdAt: '2026-03-12T10:30:00',
		status: 'PENDING',
		paymentMethod: 'BANK_TRANSFER',
		totalAmount: 1800000,
		totalItems: 4,
	},
	{
		invoiceID: 1007,
		createdAt: '2026-03-12T16:45:00',
		status: 'COMPLETED',
		paymentMethod: 'MoMo',
		totalAmount: 3200000,
		totalItems: 6,
	},
	{
		invoiceID: 1008,
		createdAt: '2026-03-13T09:10:00',
		status: 'PAID',
		paymentMethod: 'VNPAY',
		totalAmount: 670000,
		totalItems: 2,
	},
	{
		invoiceID: 1009,
		createdAt: '2026-03-13T14:22:00',
		status: 'PENDING',
		paymentMethod: 'COD',
		totalAmount: 530000,
		totalItems: 1,
	},
	{
		invoiceID: 1010,
		createdAt: '2026-03-14T11:05:00',
		status: 'COMPLETED',
		paymentMethod: 'CREDIT_CARD',
		totalAmount: 2500000,
		totalItems: 4,
	},
];

export default function Page(): JSX.Element {
	return <InvoiceAdminPageClient invoices={mockInvoices} />
}
