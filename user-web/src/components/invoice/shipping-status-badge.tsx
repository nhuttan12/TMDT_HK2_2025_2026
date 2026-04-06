import { Badge } from '@/components/ui/badge';
import { JSX } from 'react';

import {
	ShippingStatus,

} from '@/types/invoices/user/ShippingStatus';
import {getShippingStatusLabel} from "@/types/invoices/user/ShippingStatusLabel";

interface Props {
	status: ShippingStatus;
}

export function ShippingStatusBadge({ status }: Props): JSX.Element {
	switch (status) {
		case 'PREPARING':
			return (
				<Badge variant="secondary">
					{getShippingStatusLabel(status)}
				</Badge>
			);

		case 'SHIPPING':
			return (
				<Badge className="bg-blue-500">
					{getShippingStatusLabel(status)}
				</Badge>
			);

		case 'DELIVERED':
			return (
				<Badge className="bg-green-600">
					{getShippingStatusLabel(status)}
				</Badge>
			);

		default:
			return <Badge>Unknown</Badge>;
	}
}