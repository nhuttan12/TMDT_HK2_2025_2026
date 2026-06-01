'use client';

import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { JSX } from 'react';
import { useUserInvoicesQuery } from '@/queries/invoices/user/use-invoice-detail-query';
import {
	UserInvoicesLogicReturn,
	useUserInvoicesLogic,
} from '@/hooks/invoices/user/use-user-invoices-logic';
import { UserInvoicesUi } from '@/app/(app)/(protected)/profile/invoices/_components/user-invoices-ui';

interface UserInvoicesContainerProps {
	userId: string;
	initialInvoices: UserInvoice[];
}

export default function UserInvoicesContainer({
	userId,
	initialInvoices,
}: UserInvoicesContainerProps): JSX.Element {
	// Truyền userId vào Query
	const { data: invoices = [], isLoading } = useUserInvoicesQuery(userId, initialInvoices);

	const logic: UserInvoicesLogicReturn = useUserInvoicesLogic(invoices);

	return (
		<UserInvoicesUi
			{...logic}
			isLoading={isLoading}
		/>
	);
}
