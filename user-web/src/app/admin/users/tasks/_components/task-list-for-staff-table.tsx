import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { TaskAssignmentList } from '@/types/users/admin/TaskAssignmentList';
import React, { JSX } from 'react';
import ProductStatusBadge from '@/components/user/admin/task-status-badge';
import { TaskAdminSortField } from '@/types/users/admin/TaskAdminSortField';

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
	return (
		<Table>
			<TableHeader>
				<TableRow className='text-'>
					<TableHead
						className='cursor-pointer select-none'
						onClick={() => handleSort('title')}
					>
						<div className='flex items-center gap-1'>
							<span>Nhiệm vụ</span>
							{renderSortIcon('title')}
						</div>
					</TableHead>

					<TableHead>Mô tả</TableHead>

					<TableHead
						className='cursor-pointer select-none'
						onClick={() => handleSort('assignee')}
					>
						<div className='flex items-center gap-1'>
							<span>Nhân viên</span>
							{renderSortIcon('assignee')}
						</div>
					</TableHead>

					<TableHead
						className='cursor-pointer select-none'
						onClick={() => handleSort('date')}
					>
						<div className='flex items-center gap-1'>
							<span>Ngày</span>
							{renderSortIcon('date')}
						</div>
					</TableHead>

					<TableHead
						className='cursor-pointer select-none'
						onClick={() => handleSort('status')}
					>
						<div className='flex items-center gap-1'>
							<span>Trạng thái</span>
							{renderSortIcon('status')}
						</div>
					</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{tasks.map(
					(task: TaskAssignmentList): JSX.Element => (
						<TableRow key={task.taskID}>
							<TableCell className='font-medium'>{task.title}</TableCell>

							<TableCell>{task.description}</TableCell>

							<TableCell>{task.assignee}</TableCell>

							<TableCell>{task.date}</TableCell>

							<TableCell>
								<ProductStatusBadge status={task.status} />
							</TableCell>
						</TableRow>
					),
				)}
			</TableBody>
		</Table>
	);
}
