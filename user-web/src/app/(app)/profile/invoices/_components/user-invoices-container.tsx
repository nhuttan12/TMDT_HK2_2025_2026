import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { JSX } from 'react';
import { useUserInvoicesQuery } from '@/queries/invoices/user/use-invoice-detail-query';

interface UserInvoicesContainerProps {
	userId: number;
	initialInvoices: UserInvoice[];
}

export default function UserInvoicesContainer(props: UserInvoicesContainerProps): JSX.Element {
	const { userId, initialInvoices } = props;

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
