import { Badge } from '@/components/ui/badge';
import React, { JSX } from 'react';
import { TaskStatus } from '@/types/users/admin/TaskStatus';

interface Props {
	status: TaskStatus;
}

export default function ProductStatusBadge({ status }: Props): JSX.Element {
	if (status === 'pending') {
		return <Badge variant='secondary'>Chưa bắt đầu</Badge>;
	}

	if (status === 'in-progress') {
		return <Badge>Đang làm</Badge>;
	}

	if (status === 'done') {
		return <Badge className='bg-green-600'>Hoàn thành</Badge>;
	}

	return <Badge>Không xác định</Badge>;
}
