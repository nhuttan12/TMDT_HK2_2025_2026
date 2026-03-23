import { GoodsReceiptStatus } from '@/types/inventories/receipts/GoodsReceiptStatus';
import { Badge } from '@/components/ui/badge';
import { JSX } from 'react';

const statusMap: Record<GoodsReceiptStatus, { label: string; variant: BadgeVariant }> = {
	draft: { label: 'Bản nháp', variant: 'secondary' },
	confirmed: { label: 'Đã xác nhận', variant: 'default' },
	cancelled: { label: 'Đã huỷ', variant: 'destructive' },
};

export default function GoodsReceiptStatusBadge({ status }: { status: GoodsReceiptStatus }): JSX.Element {
	return (
		<Badge variant={statusMap[status].variant}>
			{statusMap[status].label}
		</Badge>
	);
}