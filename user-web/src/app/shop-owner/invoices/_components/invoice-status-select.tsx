import React, { JSX } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';

export interface InvoiceStatusSelectProps {
	invoiceId: string;
	status: InvoiceStatus;
	onChangeStatus: (id: string, status: InvoiceStatus) => void;
}

export function InvoiceStatusSelect({
	invoiceId,
	status,
	onChangeStatus,
}: InvoiceStatusSelectProps): JSX.Element {
	return (
		<Select
			defaultValue={status}
			onValueChange={(value: string): void =>
				onChangeStatus(invoiceId, value as InvoiceStatus)
			}
		>
			<SelectTrigger
				className='w-40'
				// Chặn sự kiện click lan ra row ngoài (tránh trigger onRowClick của DataTable)
				onClick={(e: React.MouseEvent<HTMLButtonElement>): void => e.stopPropagation()}
			>
				<SelectValue />
			</SelectTrigger>

			<SelectContent>
				{status === 'pending' ? (
					<>
						<SelectItem value='pending'>Chờ xử lý</SelectItem>
						<SelectItem value='processing'>Duyệt đơn (Đang xử lý)</SelectItem>
						<SelectItem value='cancelled'>Huỷ đơn</SelectItem>
					</>
				) : (
					<>
						<SelectItem value='processing'>Đang xử lý</SelectItem>
						<SelectItem value='completed'>Hoàn tất</SelectItem>
						<SelectItem value='returned'>Đã hoàn trả</SelectItem>
						<SelectItem value='cancelled'>Đã huỷ</SelectItem>
					</>
				)}
			</SelectContent>
		</Select>
	);
}
