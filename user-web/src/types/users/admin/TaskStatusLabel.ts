import { TaskStatus } from '@/types/users/admin/TaskStatus';

const taskStatusLabel: Record<TaskStatus, string> = {
	'pending': 'Chờ thực hiện',
	'in-progress': 'Đang thực hiện',
	'done': 'Hoàn thành',
};

export function getTaskStatusLabel(status: TaskStatus): string {
	return taskStatusLabel[status];
}