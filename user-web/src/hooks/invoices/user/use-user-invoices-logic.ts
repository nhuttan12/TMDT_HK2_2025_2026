'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';

export interface UserInvoicesLogicReturn {
	currentPage: number;
	totalPages: number;
	paginatedInvoices: UserInvoice[];
	totalAmountAll: number;
	handlePageChange: (page: number) => void;
	handleRedirectInvoiceDetail: (invoiceId: string) => void;
}

interface UserInvoicesLogic {
	invoices: UserInvoice[];
	totalPages: number;
}

export function useUserInvoicesLogic({
	invoices,
	totalPages,
}: UserInvoicesLogic): UserInvoicesLogicReturn {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const router: AppRouterInstance = useRouter();
	const pageSize: number = 10;

	// Lấy ra danh sách hóa đơn theo trang hiện tại (Fix lỗi phân trang cũ)
	const paginatedInvoices: UserInvoice[] = useMemo(() => {
		const startIndex: number = (currentPage - 1) * pageSize;
		const endIndex: number = startIndex + pageSize;
		return invoices.slice(startIndex, endIndex);
	}, [invoices, currentPage, pageSize]);

	// Tính tổng số tiền của tất cả hóa đơn (cho footer)
	const totalAmountAll: number = useMemo(() => {
		return invoices.reduce((sum: number, i: UserInvoice) => sum + i.totalAmount, 0);
	}, [invoices]);

	const handlePageChange = (page: number): void => {
		setCurrentPage(page);
	};

	const handleRedirectInvoiceDetail = (invoiceId: string): void => {
		router.push(`invoices/${invoiceId}`);
	};

	return {
		currentPage,
		totalPages,
		paginatedInvoices,
		totalAmountAll,
		handlePageChange,
		handleRedirectInvoiceDetail,
	};
}
