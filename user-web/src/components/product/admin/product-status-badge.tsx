import { Badge } from '@/components/ui/badge';
import { JSX } from 'react';

interface Props {
	status: boolean;
}

export default function ProductStatusBadge({ status }: Props): JSX.Element {
	if (status) {
		return <Badge>Đang bán</Badge>;
	}

	return <Badge variant="secondary">Ẩn</Badge>;
}