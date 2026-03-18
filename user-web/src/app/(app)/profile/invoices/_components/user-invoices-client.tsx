'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { useRouter } from 'next/navigation';
import { JSX, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface Props {
	invoices: UserInvoice[];
}

export default function UserInvoicesClient({ invoices }: Props): JSX.Element {
	const [currentPage, setCurrentPage] = useState<number>(1);

	const router: AppRouterInstance = useRouter();

	const getStatusLabel = (status: string): string | JSX.Element => {
		switch (status) {
			case 'PAID':
				return <span className='text-green-600 font-medium'>Đã thanh toán</span>;
			case 'PENDING':
				return <span className='text-yellow-600 font-medium'>Chờ xử lý</span>;
			case 'CANCELLED':
				return <span className='text-red-600 font-medium'>Đã hủy</span>;
			default:
				return status;
		}
	};

	const handleRedirectInvoiceDetail = (invoiceID: number) => {
		router.push(`invoices/${invoiceID}`);
	};

	const pageSize = 10;

	const totalPages: number = Math.ceil(invoices.length / pageSize);

	return (
		<div className='border rounded-2xl bg-white shadow-sm'>
			{/* Table container */}
			<div className='overflow-x-auto'>
				<div className='max-h-[600px] overflow-y-auto'>
					<Table className='table-auto w-full'>
						<TableHeader className='whitespace-nowrap'>
							<TableRow>
								<TableHead className='w-35'>Mã hóa đơn</TableHead>
								<TableHead>Ngày tạo</TableHead>
								<TableHead>Số sản phẩm</TableHead>
								<TableHead>Trạng thái</TableHead>
								<TableHead>Thanh toán</TableHead>
								<TableHead className='text-right min-w-[100px]'>
									Tổng tiền
								</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{invoices.map(
								(invoice: UserInvoice): JSX.Element => (
									<TableRow
										key={invoice.id}
										className='cursor-pointer hover:bg-muted/50 transition-colors'
										onClick={() =>
											handleRedirectInvoiceDetail(invoice.id)
										}
									>
										<TableCell className='font-medium'>
											#{invoice.id}
										</TableCell>

										<TableCell>
											{new Date(invoice.createdAt).toLocaleDateString(
												'vi-VN',
											)}
										</TableCell>

										<TableCell>{invoice.totalItems} sản phẩm</TableCell>

										<TableCell>{getStatusLabel(invoice.status)}</TableCell>

										<TableCell>{invoice.paymentMethod}</TableCell>

										<TableCell className='text-right font-semibold'>
											{invoice.totalAmount.toLocaleString('vi-VN')} ₫
										</TableCell>
									</TableRow>
								),
							)}
						</TableBody>

						<TableFooter>
							<TableRow>
								<TableCell colSpan={5}>Tổng cộng</TableCell>
								<TableCell className='text-right font-bold'>
									{invoices
										.reduce((sum, i) => sum + i.totalAmount, 0)
										.toLocaleString('vi-VN')}{' '}
									₫
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>

			{/* Pagination */}
			<div className='flex justify-center mt-6 gap-2'>
				{Array.from({ length: totalPages }).map((_, index) => {
					const page = index + 1;
					const isActive = page === currentPage;

					return (
						<button
							key={page}
							onClick={() => setCurrentPage(page)}
							className={`
					w-9 h-9 rounded-full text-sm font-medium transition
					${isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
				`}
						>
							{page}
						</button>
					);
				})}
			</div>
		</div>
	);
}
