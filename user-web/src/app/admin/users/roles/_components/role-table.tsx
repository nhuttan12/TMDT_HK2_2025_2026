import { JSX, MouseEvent } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Role } from '@/types/users/admin/Role';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface Props {
	roles: Role[];
	onView: (e: MouseEvent<HTMLTableRowElement>, roleNName: string) => void;
	onEdit: (e: MouseEvent<HTMLButtonElement>, roleNName: string) => void;
}

export default function RoleTable({ roles, onView, onEdit }: Props): JSX.Element {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Tên quyền</TableHead>
					<TableHead>Mô tả</TableHead>
					<TableHead>Trạng thái</TableHead>
					<TableHead className='text-right'>Hành động</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{roles.map(
					(role: Role): JSX.Element => (
						<TableRow
							className='cursor-pointer'
							key={role.roleID}
							onClick={(e) => onView(e, role.name)}
						>
							<TableCell className='font-medium'>{role.name}</TableCell>

							<TableCell className='text-muted-foreground'>
								{role.description}
							</TableCell>

							<TableCell>
								{role.isActive ? (
									<Badge>Hoạt động</Badge>
								) : (
									<Badge variant='secondary'>Tạm khóa</Badge>
								)}
							</TableCell>

							<TableCell className='text-right'>
								<Button
									className='cursor-pointer'
									onClick={(e) => onEdit(e, role.name)}
								>
									<Pencil
										size={14}
										className='mr-2'
									/>
									Chỉnh sửa
								</Button>
							</TableCell>
						</TableRow>
					),
				)}
			</TableBody>
		</Table>
	);
}
