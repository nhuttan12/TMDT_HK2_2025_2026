import { GoodsReceiptStatus } from '@/types/inventories/receipts/uis/GoodsReceiptStatus';
import { Badge } from '@/components/ui/badge';
import { JSX } from 'react';
import { BadgeVariant } from '@/types/inventories/receipts/uis/BadgeVariant';

const statusMap: Record<GoodsReceiptStatus, { label: string; variant: BadgeVariant }> = {
	pending: { label: 'Đang duyệt', variant: 'default' },
	completed: { label: 'Đã xác nhận', variant: 'default' },
};

interface Props {
	status: GoodsReceiptStatus;
}

export default function GoodsReceiptStatusBadge({ status }: Props): JSX.Element {
	return (
		<Badge variant={statusMap[status].variant}>
			{statusMap[status].label}
		</Badge>
	);
}