'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { JSX, SyntheticEvent, useState } from 'react';
import { TaskCreating } from '@/types/users/admin/TaskCreating';
import { TaskStatus } from '@/types/users/admin/TaskStatus';
import { Button } from '@/components/ui/button';
import { Employee } from '@/types/users/admin/Employee';

interface Props {
	employees: Employee[];
}

export default function TaskAssignmentForm({ employees }: Props): JSX.Element {
	const [form, setForm] = useState<TaskCreating>({
		title: '',
		description: '',
		assignee: '',
		date: '',
		status: 'pending',
	});

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		console.log('Task assignment:', form);

		// call API here
	};

	return (
		<div className='max-w-2xl min-h-[calc(100vh-3rem)] mx-auto'>
			<Card>
				<CardHeader>
					<CardTitle>Giao nhiệm vụ cho nhân viên</CardTitle>
				</CardHeader>

				<CardContent>
					<form
						onSubmit={handleSubmit}
						className='space-y-5'
					>
						{/* Task title */}
						<div>
							<label className='text-sm font-medium'>Tên nhiệm vụ</label>
							<Input
								placeholder='Nhập tên nhiệm vụ...'
								value={form.title}
								onChange={(e) =>
									setForm({
										...form,
										title: e.target.value,
									})
								}
							/>
						</div>

						{/* Description */}
						<div>
							<label className='text-sm font-medium'>Mô tả</label>
							<Textarea
								placeholder='Mô tả chi tiết nhiệm vụ...'
								value={form.description}
								onChange={(e) =>
									setForm({
										...form,
										description: e.target.value,
									})
								}
							/>
						</div>

						{/* Select employee */}
						<div>
							<label className='text-sm font-medium'>Chọn nhân viên</label>

							<Select
								onValueChange={(value) =>
									setForm({
										...form,
										assignee: value,
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder='Chọn nhân viên' />
								</SelectTrigger>

								<SelectContent>
									{employees.map((emp) => (
										<SelectItem
											key={emp.id}
											value={emp.name}
										>
											{emp.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Date */}
						<div>
							<label className='text-sm font-medium'>Ngày thực hiện</label>

							<Input
								type='date'
								value={form.date}
								onChange={(e) =>
									setForm({
										...form,
										date: e.target.value,
									})
								}
							/>
						</div>

						{/* Status */}
						<div>
							<label className='text-sm font-medium'>Trạng thái</label>

							<Select
								defaultValue='pending'
								onValueChange={(value: TaskStatus) =>
									setForm({
										...form,
										status: value,
									})
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value='pending'>Chưa bắt đầu</SelectItem>

									<SelectItem value='in-progress'>Đang thực hiện</SelectItem>

									<SelectItem value='done'>Hoàn thành</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Submit */}
						<Button
							type='submit'
							className='w-full'
						>
							Giao nhiệm vụ
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
