import { Badge } from '@/components/ui/badge';
import { JSX } from 'react';

interface Props {
	status: boolean;
}

export default function CategoryStatusBadge({ status }: Props): JSX.Element {
	if (status) {
		return <Badge>Hoạt động</Badge>;
	}

	return <Badge variant="secondary">Ẩn</Badge>;
}