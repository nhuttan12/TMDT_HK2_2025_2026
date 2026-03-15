'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React, { JSX, useEffect, useState } from 'react';
import { TaskAssignmentList } from '@/types/users/admin/TaskAssignmentList';
import { Timeout } from '@radix-ui/primitive';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { TaskAdminSortField, TaskAdminSortOrder } from '@/types/users/admin/TaskAdminSortField';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
	tasks: TaskAssignmentList[];
}

export default function TaskListForStaffTable({ tasks }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const sortField = searchParams.get('sort') as TaskAdminSortField | null;
	const sortOrder = searchParams.get('order') as TaskAdminSortOrder | null;

	const [data, setData] = useState<TaskAssignmentList[]>(tasks);
	const [search, setSearch] = useState('');
	const [dateFilter, setDateFilter] = useState('');
	const [loading, setLoading] = useState(false);

	const fetchTasks = async () => {
		setLoading(true);

		const filtered = tasks.filter((task) => {
			const matchSearch =
				task.title.toLowerCase().includes(search.toLowerCase()) ||
				task.assignee.toLowerCase().includes(search.toLowerCase());

			const matchDate = dateFilter ? task.date === dateFilter : true;

			return matchSearch && matchDate;
		});

		setData(filtered);

		setLoading(false);
	};

	const handleSort = (field: TaskAdminSortField): void => {
		const currentSort = searchParams.get('sort');
		const currentOrder = searchParams.get('order');

		let newOrder: TaskAdminSortOrder = 'asc';

		if (currentSort === field) {
			newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
		}

		const params = new URLSearchParams(searchParams.toString());
		params.set('sort', field);
		params.set('order', newOrder);

		router.push(`?${params.toString()}`);
	};

	const renderSortIcon = (field: TaskAdminSortField): JSX.Element | null => {
		if (sortField !== field) return null;

		if (sortOrder === 'asc')
			return (
				<ChevronUp
					size={14}
					className='ml-1'
				/>
			);

		if (sortOrder === 'desc')
			return (
				<ChevronDown
					size={14}
					className='ml-1'
				/>
			);

		return null;
	};

	// gọi API khi search hoặc filter thay đổi
	useEffect(() => {
		const debounce: Timeout = setTimeout((): void => {
			fetchTasks();
		}, 400);

		return (): void => clearTimeout(debounce);
	}, [search, dateFilter]);

	const handleRedirectToTaskAssignmentForStaff = (
		e: React.MouseEvent<HTMLButtonElement>,
	): void => {
		e.stopPropagation();
		router.push('/admin/users/tasks/assign');
	};

	return (
		<div className='space-y-6'>
			<h1 className='text-2xl font-bold'>Phân công nhiệm vụ</h1>

			{/* Search + Filter + Task Assign */}
			<div className='flex justify-between items-center'>
				<div className='flex gap-4'>
					<Input
						placeholder='Tìm kiếm nhiệm vụ...'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className='max-w-sm'
					/>

					<Input
						type='date'
						value={dateFilter}
						onChange={(e) => setDateFilter(e.target.value)}
						className='w-[200px]'
					/>

					<Button
						variant='secondary'
						onClick={() => {
							setSearch('');
							setDateFilter('');
						}}
						className='cursor-pointer transition-all duration-200 hover:bg-gray-200 hover:shadow-md active:scale-95'
					>
						Xóa lọc
					</Button>
				</div>

				<Button
					onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
						handleRedirectToTaskAssignmentForStaff(e)
					}
					className='cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.03] active:scale-95'
				>
					Phân công nhiệm vụ cho nhân viên
				</Button>
			</div>

			{/* Table */}
			<div className='border rounded-lg'>
				<Table className='text-base'>
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
						{loading && (
							<TableRow>
								<TableCell
									colSpan={6}
									className='text-center'
								>
									Đang tải...
								</TableCell>
							</TableRow>
						)}

						{!loading &&
							tasks.map(
								(task: TaskAssignmentList): JSX.Element => (
									<TableRow key={task.taskID}>
										<TableCell className='font-medium'>{task.title}</TableCell>

										<TableCell>{task.description}</TableCell>

										<TableCell>{task.assignee}</TableCell>

										<TableCell>{task.date}</TableCell>

										<TableCell>
											{task.status === 'pending' && (
												<Badge variant='secondary'>Chưa bắt đầu</Badge>
											)}

											{task.status === 'in-progress' && (
												<Badge>Đang làm</Badge>
											)}

											{task.status === 'done' && (
												<Badge className='bg-green-600'>Hoàn thành</Badge>
											)}
										</TableCell>
									</TableRow>
								),
							)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
