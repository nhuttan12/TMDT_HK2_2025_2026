import { TaskStatus } from '@/types/users/admin/TaskStatus';

export interface TaskAssignmentFilterValues {
	title?: string;
	description?: string;
	assignee?: string;

	dateFrom?: string;
	dateTo?: string;

	status?: TaskStatus;
}