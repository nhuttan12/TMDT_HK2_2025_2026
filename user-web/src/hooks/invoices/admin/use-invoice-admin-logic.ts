import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { usePagination } from '@/hooks/share/use-pagination';
import { InvoiceAdminFilterValues } from '@/types/invoices/admin/InvoiceAdminFilterValues';
import { FilterField } from '@/types/uis/FilterField';
import { PaymentMethod } from '@/types/invoices/user/PaymentMethod';
import { getPaymentMethodLabel } from '@/utils/invoices/payment-method-label';

export interface UseInvoiceAdminLogicReturn {
	currentPage: number;
	changePage: (page: number) => void;
	currentStatus: InvoiceStatus | null;
	handleStatusChange: (status: InvoiceStatus) => void;
	handleRedirectToInvoiceDetail: (invoiceId: string) => void;
	filterSchema: FilterField<InvoiceAdminFilterValues>[];
}

export function useInvoiceAdminLogic(): UseInvoiceAdminLogicReturn {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();
	const { currentPage, changePage } = usePagination();

	const currentStatus: InvoiceStatus | null = searchParams.get('status') as InvoiceStatus | null;

	const handleStatusChange = (status: InvoiceStatus): void => {
		const params: URLSearchParams = new URLSearchParams(searchParams.toString());
		params.set('status', status);
		router.push(`/shop-owner/invoices?${params.toString()}`);
	};

	const handleRedirectToInvoiceDetail = (invoiceId: string): void => {
		router.push(`/shop-owner/invoices/${invoiceId}`);
	};

	const paymentMethods: PaymentMethod[] = [
		'COD',
		'VNPAY',
		'MoMo',
		'CreditCard',
		'bank_transfer',
	];

	const filterSchema: FilterField<InvoiceAdminFilterValues>[] = [
		{
			key: 'paymentMethod',
			label: 'Phương thức thanh toán',
			type: 'select',
			gridSpan: 2,
			options: paymentMethods.map((method: PaymentMethod) => ({
				label: getPaymentMethodLabel(method),
				value: method,
			})),
		},
		{ key: 'dateFrom', label: 'Từ ngày', type: 'date', gridSpan: 1 },
		{ key: 'dateTo', label: 'Đến ngày', type: 'date', gridSpan: 1 },
		{
			key: 'minTotal',
			label: 'Tổng tiền từ',
			type: 'number',
			placeholder: 'Ví dụ: 100000',
			gridSpan: 1,
		},
		{
			key: 'maxTotal',
			label: 'Tổng tiền đến',
			type: 'number',
			placeholder: 'Ví dụ: 500000',
			gridSpan: 1,
		},
		{
			key: 'minItems',
			label: 'Số sản phẩm ≥',
			type: 'number',
			placeholder: 'Ví dụ: 2',
			gridSpan: 2,
		},
	];

	return {
		currentPage,
		changePage,
		currentStatus,
		handleStatusChange,
		handleRedirectToInvoiceDetail,
		filterSchema: filterSchema,
	};
}
