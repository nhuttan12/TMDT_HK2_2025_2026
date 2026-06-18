'use client';

import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { JSX } from 'react';
import { useUserInvoicesQuery } from '@/queries/invoices/user/use-invoice-detail-query';
import {
	UserInvoicesLogicReturn,
	useUserInvoicesLogic,
} from '@/hooks/invoices/user/use-user-invoices-logic';
import { UserInvoicesUi } from '@/app/(app)/(protected)/profile/invoices/_components/user-invoices-ui';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

interface UserInvoicesContainerProps {
	userId: string;
	initialInvoices: PaginationResponse<UserInvoice>;
}

export default function UserInvoicesContainer({
	userId,
	initialInvoices,
}: UserInvoicesContainerProps): JSX.Element {
	// Truyền userId vào Query
	const { data, isLoading } = useUserInvoicesQuery(userId, initialInvoices);

	const currentData = data?.data || initialInvoices.data;
	const currentMeta = data?.meta || initialInvoices.meta;

	const logic = useUserInvoicesLogic({
		invoices: currentData,
		totalPages: currentMeta.totalPages,
	});

	return (
		<UserInvoicesUi
			{...logic}
			isLoading={isLoading}
		/>
	);
}
