import { TaskAssignmentList } from '@/types/users/admin/TaskAssignmentList';
import React, { JSX, useState } from 'react';
import TaskStatusBadge from '@/components/user/admin/task-status-badge';
import { TaskAdminSortField } from '@/types/users/admin/TaskAdminSortField';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';

interface Props {
	tasks: TaskAssignmentList[];
	handleSort: (field: TaskAdminSortField) => void;
	renderSortIcon: (field: TaskAdminSortField) => JSX.Element | null;
}

export default function TaskListForStaffTable({
	tasks,
	handleSort,
	renderSortIcon,
}: Props): JSX.Element {
	const [selected, setSelected] = useState<number[]>([]);

	const toggleSelect = (taskID: number): void => {
		setSelected((prev: number[]): number[] =>
			prev.includes(taskID)
				? prev.filter((x: number): boolean => x !== taskID)
				: [...prev, taskID],
		);
	};

	const toggleSelectAll = (): void => {
		if (selected.length === tasks.length) {
			setSelected([]);
		} else {
			setSelected(tasks.map((i: TaskAssignmentList): number => i.id));
		}
	};

	const columns: Column<TaskAssignmentList>[] = [
		{
			key: 'title',
			header: (
				<div className='flex items-center gap-1'>
					<span>Nhiệm vụ</span>
					{renderSortIcon('title')}
				</div>
			),
			onHeaderClick: () => handleSort('title'),
		},
		{
			key: 'description',
			header: 'Mô tả',
		},
		{
			key: 'assignee',
			header: (
				<div className='flex items-center gap-1'>
					<span>Nhân viên</span>
					{renderSortIcon('assignee')}
				</div>
			),
			onHeaderClick: () => handleSort('assignee'),
		},
		{
			key: 'date',
			header: (
				<div className='flex items-center gap-1'>
					<span>Ngày</span>
					{renderSortIcon('date')}
				</div>
			),
			onHeaderClick: () => handleSort('date'),
		},
		{
			key: 'status',
			header: (
				<div className='flex items-center gap-1'>
					<span>Trạng thái</span>
					{renderSortIcon('status')}
				</div>
			),
			onHeaderClick: () => handleSort('status'),

			render: (task: TaskAssignmentList): JSX.Element => (
				<TaskStatusBadge status={task.status} />
			),
		},
	];

	return (
		<DataTable
			data={tasks}
			columns={columns}
			getRowKey={(row: TaskAssignmentList): number => row.id}
			selectable={{
				selected: selected,
				onToggle: toggleSelect,
				onToggleAll: toggleSelectAll,
			}}
		/>
	);
}
