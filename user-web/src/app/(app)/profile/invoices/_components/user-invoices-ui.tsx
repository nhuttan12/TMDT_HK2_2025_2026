import { JSX } from 'react';
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
import { UserInvoicesLogicReturn } from '@/hooks/invoices/user/use-user-invoices-logic';
import {getInvoiceStatusColor} from "@/utils/invoices/invoice-status-color";
import {InvoiceStatus} from "@/types/invoices/user/InvoiceStatus";
import {getInvoiceStatusLabel} from "@/utils/invoices/invoice-status-label";

interface UserInvoicesUiProps extends UserInvoicesLogicReturn {
	isLoading: boolean;
}

// Helper ngoài Component để tối ưu hiệu suất render
function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('vi-VN');
}

export function UserInvoicesUi({
	paginatedInvoices,
	currentPage,
	totalPages,
	totalAmountAll,
	isLoading,
	handlePageChange,
	handleRedirectInvoiceDetail,
}: UserInvoicesUiProps): JSX.Element {
	if (isLoading) {
		return <div className='text-center py-10'>Đang tải danh sách hóa đơn...</div>;
	}

	return (
		<div className='border rounded-2xl bg-white shadow-sm p-4'>
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
							{paginatedInvoices.map(
								(invoice: UserInvoice): JSX.Element => (
									<TableRow
										key={invoice.id}
										className='cursor-pointer hover:bg-muted/50 transition-colors'
										onClick={() => handleRedirectInvoiceDetail(invoice.id)}
									>
										<TableCell className='font-medium'>#{invoice.id}</TableCell>
										<TableCell>{formatDate(invoice.createdAt)}</TableCell>
										<TableCell>{invoice.totalItems} sản phẩm</TableCell>
										<TableCell>
											<span
												className={getInvoiceStatusColor(
													invoice.status as InvoiceStatus,
												)}
											>
												{getInvoiceStatusLabel(
													invoice.status as InvoiceStatus,
												)}
											</span>
										</TableCell>
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
								<TableCell colSpan={5}>Tổng cộng (tất cả trang)</TableCell>
								<TableCell className='text-right font-bold text-lg text-slate-800'>
									{totalAmountAll.toLocaleString('vi-VN')} ₫
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className='flex justify-center mt-6 gap-2'>
					{Array.from({ length: totalPages }).map((_, index: number) => {
						const page: number = index + 1;
						const isActive: boolean = page === currentPage;

						return (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								className={`w-9 h-9 rounded-full text-sm font-medium transition cursor-pointer ${
									isActive
										? 'bg-slate-900 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
								}`}
							>
								{page}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
