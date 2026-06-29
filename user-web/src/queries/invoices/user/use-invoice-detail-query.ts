'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import {
	InvoiceService,
} from '@/services/invoices/user/invoice-service';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import apiClient from '@/lib/api-client';

export function useInvoiceDetailQuery(
	invoiceId: number | string,
	initialData?: InvoiceDetail,
): UseQueryResult<InvoiceDetail, Error> {
	const invoiceService = new InvoiceService(apiClient);
	return useQuery({
		queryKey: ['invoice-detail', invoiceId],
		queryFn: (): Promise<InvoiceDetail> =>
			invoiceService.getInvoiceDetailByInvoiceId(invoiceId),
		initialData: initialData, // Nhận data có sẵn từ Server để hiển thị ngay lập tức
		enabled: !!invoiceId,
		// enabled: invoiceId > 0, // Đổi điều kiện check vì giờ là kiểu number
		staleTime: 1000 * 60 * 5, // Giữ data tươi trong 5 phút, tránh gọi lại API vô ích
	});
}

export function useUserInvoicesQuery(
	userId: string,
	initialData?: PaginationResponse<UserInvoice>,
): UseQueryResult<PaginationResponse<UserInvoice>, Error> {
	const invoiceService = new InvoiceService(apiClient);
	return useQuery({
		// Đưa userId vào key để định danh bộ cache duy nhất cho user này
		queryKey: ['user-invoices', userId],

		// Sử dụng arrow function để truyền tham số vào service
		queryFn: () => invoiceService.getUserInvoicesByUserId(userId),

		initialData: initialData,

		// Chỉ gọi API khi userId hợp lệ
		enabled: !!userId,

		staleTime: 1000 * 60 * 5, // Cache trong 5 phút
	});
}