'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { JSX, useEffect, useState } from 'react';
import { TaskAssignmentList } from '@/types/users/admin/TaskAssignmentList';
import { Timeout } from '@radix-ui/primitive';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { TaskAdminSortField } from '@/types/users/admin/TaskAdminSortField';
import { useTableSort } from '@/hooks/use-table-sort';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import TaskListForStaffTable from '@/app/admin/users/tasks/_components/task-list-for-staff-table';

interface Props {
	tasks: TaskAssignmentList[];
}

export default function TaskListForStaffClient({ tasks }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<TaskAdminSortField>();

	const [data, setData] = useState<TaskAssignmentList[]>(tasks);
	const [search, setSearch] = useState('');
	const [dateFilter, setDateFilter] = useState('');
	const [loading, setLoading] = useState(false);

	const fetchTasks = async () => {
		setLoading(true);

		const filtered: TaskAssignmentList[] = tasks.filter((task: TaskAssignmentList): boolean => {
			const matchSearch =
				task.title.toLowerCase().includes(search.toLowerCase()) ||
				task.assignee.toLowerCase().includes(search.toLowerCase());

			const matchDate: boolean = dateFilter ? task.date === dateFilter : true;

			return matchSearch && matchDate;
		});

		setData(filtered);

		setLoading(false);
	};

	// gọi API khi search hoặc filter thay đổi
	useEffect(() => {
		const debounce: Timeout = setTimeout((): void => {
			fetchTasks();
		}, 400);

		return (): void => clearTimeout(debounce);
	}, [search, dateFilter]);

	const handleRedirectToTaskAssignmentForStaff = () // e: React.MouseEvent<HTMLButtonElement>,
	: void => {
		// e.stopPropagation();
		router.push('/admin/users/tasks/assign');
	};

	return (
		<div className='space-y-6'>

			{/* Search + Filter + Task Assign */}
			<AdminTableHeader
				title='Phân công nhiệm vụ'
				description='Phân công nhiệm vụ cho nhân viên'
				searchPlaceholder='Tìm kiếm nhiệm vụ được phân công'
				onAdd={handleRedirectToTaskAssignmentForStaff}
				addLabel='Phân công nhiệm vụ cho nhân viên'
			/>

			{/* Table */}
			<div className='border rounded-lg'>
				<TaskListForStaffTable
					tasks={data}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
				/>
			</div>
		</div>
	);
}
