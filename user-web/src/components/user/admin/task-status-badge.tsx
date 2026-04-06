import { Badge } from '@/components/ui/badge';
import React, { JSX } from 'react';
import { TaskStatus } from '@/types/users/admin/TaskStatus';
import { getTaskStatusLabel } from '@/types/users/admin/TaskStatusLabel';

interface Props {
	status: TaskStatus;
}

export default function TaskStatusBadge({ status }: Props): JSX.Element {
	const label: string = getTaskStatusLabel(status);

	if (status === 'pending') {
		return <Badge variant='secondary'>{label}</Badge>;
	}

	if (status === 'in-progress') {
		return <Badge>{label}</Badge>;
	}

	if (status === 'done') {
		return <Badge className='bg-green-600'>{label}</Badge>;
	}

	return <Badge>Không xác định</Badge>;
}
