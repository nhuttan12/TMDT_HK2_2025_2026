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
	invoiceId: number;
	status: InvoiceStatus;
	onChangeStatus: (id: number, status: InvoiceStatus) => void;
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
				{status === 'pending_approval' ? (
					<>
						<SelectItem value='pending_approval'>Chờ duyệt</SelectItem>
						<SelectItem value='pending'>Duyệt đơn</SelectItem>
						<SelectItem value='cancelled'>Huỷ đơn</SelectItem>
					</>
				) : (
					<>
						<SelectItem value='pending'>Chờ thanh toán</SelectItem>
						<SelectItem value='paid'>Đã thanh toán</SelectItem>
						<SelectItem value='completed'>Hoàn tất</SelectItem>
						<SelectItem value='cancelled'>Đã huỷ</SelectItem>
					</>
				)}
			</SelectContent>
		</Select>
	);
}
