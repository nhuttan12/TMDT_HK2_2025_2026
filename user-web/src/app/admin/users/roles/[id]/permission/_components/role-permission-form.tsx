'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { JSX, useState } from 'react';
import { RolePermission } from '@/types/users/admin/RolePermission';
import { Switch } from '@/components/ui/switch';
import { RoleFormType } from '@/types/shared/admin/RoleFormType';
import { Button } from '@/components/ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
	permissions: RolePermission[];
	formType: RoleFormType;
}

export default function RolePermissionForm({ permissions, formType }: Props): JSX.Element {
	const [data, setData] = useState<RolePermission[]>(permissions);

	const isUpdate: boolean = formType === 'update';
	const isView: boolean = formType === 'view';

	const togglePermission = (permissionID: number) => {
		setData((prev: RolePermission[]): RolePermission[] =>
			prev.map(
				(p: RolePermission): RolePermission =>
					p.permissionID === permissionID ? { ...p, isActive: !p.isActive } : p,
			),
		);
	};

	// group permission theo resource (product, order, user...)
	const groupedPermissions = data.reduce((acc: Record<string, RolePermission[]>, permission) => {
		const resource: string = permission.code.split('.')[0];

		if (!acc[resource]) {
			acc[resource] = [];
		}

		acc[resource].push(permission);

		return acc;
	}, {});

	const firstResource: string = Object.keys(groupedPermissions)[0];

	const handleSave = () => {
		const activePermissions: number[] = data
			.filter((p: RolePermission): boolean => p.isActive)
			.map((p: RolePermission): number => p.permissionID);

		console.log(activePermissions);
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold'>Phân quyền nhân viên</h1>
				<p className='text-sm text-muted-foreground'>
					Thay đổi quyền hạn của từng chức vụ, vai trò
				</p>
			</div>

			<Accordion
				type='multiple'
				className='w-full'
				defaultValue={[firstResource]}
			>
				{Object.entries(groupedPermissions).map(([resource, perms]) => (
					<AccordionItem
						key={resource}
						value={resource}
					>
						<AccordionTrigger className='capitalize cursor-pointer '>
							{resource}
						</AccordionTrigger>

						<AccordionContent>
							<div className='space-y-3'>
								{perms.map(
									(permission: RolePermission): JSX.Element => (
										<div
											key={permission.permissionID}
											className='flex items-center justify-between border rounded-md p-3'
										>
											<div className='space-y-1'>
												<p className='font-medium'>
													{permission.permission}
												</p>

												<p className='text-sm text-muted-foreground font-mono'>
													{permission.code}
												</p>
											</div>

											<Switch
												checked={permission.isActive}
												onCheckedChange={() =>
													togglePermission(permission.permissionID)
												}
												disabled={isView}
											/>
										</div>
									),
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>

			{isUpdate && (
				<div className='flex justify-end'>
					<Button
						onClick={handleSave}
						className='cursor-pointer'
					>
						Lưu thay đổi
					</Button>
				</div>
			)}
		</div>
	);
}
