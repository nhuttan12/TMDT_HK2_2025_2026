import { JSX } from 'react';
import { TaskAssignmentList } from '@/types/users/admin/TaskAssignmentList';
import TaskListForStaffClient from '@/app/admin/users/tasks/_components/task-list-for-staff-client';
import { Metadata } from 'next';

const mockTasks: TaskAssignmentList[] = [
	{
		id: 1,
		title: 'Kiểm tra tồn kho',
		description: 'Kiểm tra số lượng giày Adidas',
		assignee: 'Nguyễn Văn A',
		date: '2026-03-12',
		status: 'pending',
	},
	{
		id: 2,
		title: 'Xử lý đơn hàng',
		description: 'Đóng gói đơn #1021',
		assignee: 'Trần Văn B',
		date: '2026-03-12',
		status: 'in-progress',
	},
	{
		id: 3,
		title: 'Cập nhật sản phẩm',
		description: 'Thêm sản phẩm Nike mới',
		assignee: 'Lê Văn C',
		date: '2026-03-11',
		status: 'done',
	},
];

export const metadata: Metadata = {
	title: 'Quản lý công việc phân công',
};

export default function Page(): JSX.Element {
	return <TaskListForStaffClient tasks={mockTasks} />;
}
