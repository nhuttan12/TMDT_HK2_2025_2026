'use client';

import {
    useInvoiceAdminLogic
} from '@/hooks/invoices/admin/use-invoice-admin-logic';
import { useUserInvoiceListQuery } from '@/queries/invoices/admin/use-user-invoice-list-query';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { JSX } from 'react';
import InvoiceAdminUi from './invoice-admin-ui';

interface Props {
	initialInvoices: UserInvoice[];
}

export default function InvoiceAdminContainer({ initialInvoices }: Props): JSX.Element {
	const { data: invoicesData } = useUserInvoiceListQuery(initialInvoices);
	const logic = useInvoiceAdminLogic();

	return (
		<InvoiceAdminUi
			invoices={invoicesData ?? []}
			{...logic}
		/>
	);
}
