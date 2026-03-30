'use client';

import React, { JSX } from 'react';
import { TaskAssignmentList } from '@/types/users/admin/TaskAssignmentList';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { TaskAdminSortField } from '@/types/users/admin/TaskAdminSortField';
import { useTableSort } from '@/hooks/use-table-sort';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import TaskListForStaffTable from '@/app/admin/users/tasks/_components/task-list-for-staff-table';
import Pagination from '@/components/layout/share/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { FilterField } from '@/types/uis/FilterField';
import { TaskAssignmentFilterValues } from '@/types/users/admin/TaskAssignmentFilterValues';

interface Props {
	tasks: TaskAssignmentList[];
}

const taskFilterSchema: FilterField<TaskAssignmentFilterValues>[] = [
	{
		key: 'title',
		label: 'Công việc',
		type: 'text',
		gridSpan: 2,
		placeholder: 'Tìm theo tên công việc',
	},
	{
		key: 'description',
		label: 'Mô tả',
		type: 'text',
		gridSpan: 2,
		placeholder: 'Tìm theo mô tả',
	},
	{
		key: 'assignee',
		label: 'Nhân viên',
		type: 'text',
		gridSpan: 2,
	},
	{
		key: 'dateFrom',
		label: 'Từ ngày',
		type: 'date',
		gridSpan: 1,
	},
	{
		key: 'dateTo',
		label: 'Đến ngày',
		type: 'date',
		gridSpan: 1,
	},
	{
		key: 'status',
		label: 'Trạng thái',
		type: 'select',
		gridSpan: 2,
		options: [
			{ label: 'Tất cả', value: 'ALL' },
			{ label: 'Chưa bắt đầu', value: 'PENDING' },
			{ label: 'Đang làm', value: 'IN_PROGRESS' },
			{ label: 'Hoàn thành', value: 'COMPLETED' },
		],
	},
];

export default function TaskListForStaffClient({ tasks }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<TaskAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToTaskAssignmentForStaff = (): void => {
		router.push('/admin/users/tasks/assign');
	};

	return (
		<div className='space-y-6'>
			{/* Search + Filter + Task Assign */}
			<AdminTableHeader<TaskAssignmentFilterValues>
				title='Phân công nhiệm vụ'
				description='Phân công nhiệm vụ cho nhân viên'
				searchPlaceholder='Tìm kiếm nhiệm vụ được phân công'
				searchKey='title'
				onAdd={handleRedirectToTaskAssignmentForStaff}
				addLabel='Phân công nhiệm vụ cho nhân viên'
				filter
				filterField={taskFilterSchema}
			/>

			{/* Table */}
			<div className='border rounded-lg'>
				<TaskListForStaffTable
					tasks={tasks}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
				/>
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
