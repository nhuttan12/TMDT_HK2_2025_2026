'use client';

import {
    useInvoiceAdminLogic
} from '@/hooks/invoices/admin/use-invoice-admin-logic';
import { useUserInvoiceListQuery } from '@/queries/invoices/admin/use-user-invoice-list-query';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { JSX } from 'react';
import InvoiceAdminUi from './invoice-admin-ui';
import { BackendPagedResult } from '@/types/products/user/productBE';

interface Props {
	initialInvoices: BackendPagedResult<UserInvoice>;
}

export default function InvoiceAdminContainer({ initialInvoices }: Props): JSX.Element {
	const { data } = useUserInvoiceListQuery(initialInvoices);
	const logic = useInvoiceAdminLogic();

    const currentInvoice = data?.items ?? initialInvoices.items;

	return (
		<InvoiceAdminUi
			invoices={currentInvoice ?? []}
			{...logic}
		/>
	);
}
