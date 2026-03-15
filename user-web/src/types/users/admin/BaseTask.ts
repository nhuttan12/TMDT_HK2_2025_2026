import { TaskStatus } from '@/types/users/admin/TaskStatus';

export interface BaseTask {
	title: string;
	description: string;
	assignee: string;
	date: string;
	status: TaskStatus;
}