'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import {
	getInvoiceDetailByInvoiceId,
	getUserInvoicesByUserId,
} from '@/services/invoices/user/invoice-service';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';

export function useInvoiceDetailQuery(
	invoiceId: number,
	initialData?: InvoiceDetail,
): UseQueryResult<InvoiceDetail, Error> {
	return useQuery({
		queryKey: ['invoice-detail', invoiceId],
		queryFn: (): Promise<InvoiceDetail> => getInvoiceDetailByInvoiceId(invoiceId),
		initialData: initialData, // Nhận data có sẵn từ Server để hiển thị ngay lập tức
		enabled: invoiceId > 0, // Đổi điều kiện check vì giờ là kiểu number
		staleTime: 1000 * 60 * 5, // Giữ data tươi trong 5 phút, tránh gọi lại API vô ích
	});
}

export function useUserInvoicesQuery(
	userId: number,
	initialData?: UserInvoice[],
): UseQueryResult<UserInvoice[], Error> {
	return useQuery({
		// Đưa userId vào key để định danh bộ cache duy nhất cho user này
		queryKey: ['user-invoices', userId],

		// Sử dụng arrow function để truyền tham số vào service
		queryFn: (): Promise<UserInvoice[]> => getUserInvoicesByUserId(userId),

		initialData: initialData,

		// Chỉ gọi API khi userId hợp lệ
		enabled: userId > 0,

		staleTime: 1000 * 60 * 5, // Cache trong 5 phút
	});
}