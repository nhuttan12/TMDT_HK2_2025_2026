'use client';

import { JSX } from 'react';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import InvoiceAdminUi from './invoice-admin-ui';
import { useUserInvoiceListQuery } from '@/queries/invoices/admin/use-user-invoice-list-query';
import {
	useInvoiceAdminLogic,
	UseInvoiceAdminLogicReturn,
} from '@/hooks/invoices/admin/use-invoice-admin-logic';

interface Props {
	initialInvoices: UserInvoice[];
}

export default function InvoiceAdminContainer({ initialInvoices }: Props): JSX.Element {
	const { data: invoicesData } = useUserInvoiceListQuery(initialInvoices);
	const logic: UseInvoiceAdminLogicReturn = useInvoiceAdminLogic();

	return (
		<InvoiceAdminUi
			invoices={invoicesData ?? []}
			{...logic}
		/>
	);
}
