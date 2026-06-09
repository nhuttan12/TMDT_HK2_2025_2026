import { Badge } from "@/components/ui/badge";
import { BatchItemStatus } from "@/types/inventories/receipts/uis/BatchItemStatus";
import { getBatchItemStatusLabel } from "@/utils/inventories/receipts/batch-item-status-label";
import { JSX } from "react";

export interface BatchItemStatusBadgeProps {
	status: BatchItemStatus;
	className?: string; // Mở rộng để có thể custom thêm style từ bên ngoài nếu cần
}

const statusColorMap: Record<BatchItemStatus, string> = {
	in_stock: 'bg-green-100 text-green-800 hover:bg-green-100/80 border-transparent',
	sold: 'bg-gray-100 text-gray-800 hover:bg-gray-100/80 border-transparent',
	defective: 'bg-red-100 text-red-800 hover:bg-red-100/80 border-transparent',
};

export default function BatchItemStatusBadge({ 
	status, 
	className = '' 
}: BatchItemStatusBadgeProps): JSX.Element {
    // 3. Lấy ra màu và text tương ứng
	const colorClasses: string = statusColorMap[status];
	const labelText: string = getBatchItemStatusLabel(status);

	return (
		<Badge
            variant="outline" 
            className={`${colorClasses} ${className}`}
        >
			{labelText}
		</Badge>
	);
}