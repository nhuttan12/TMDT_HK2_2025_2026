import { JSX } from 'react';
import { Employee } from '@/types/users/admin/Employee';
import TaskAssignmentForm from '@/app/admin/users/tasks/assign/_components/task-assignment-form';

const employees: Employee[] = [
	{ id: 1, name: 'Nguyễn Văn A' },
	{ id: 2, name: 'Trần Văn B' },
	{ id: 3, name: 'Lê Văn C' },
];

export default function Page(): JSX.Element {
	return <TaskAssignmentForm employees={employees} />;
}
