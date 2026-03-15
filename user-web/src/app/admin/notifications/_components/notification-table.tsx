import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { JSX } from 'react';
import { Notification } from '@/types/shared/notification/Notification';

interface Props {
	notifications: Notification[];
}

export default function NotificationTable({ notifications }: Props): JSX.Element {
	return (
		<div className='space-y-4'>
			<h2 className='text-xl font-semibold'>Thông báo</h2>

			<div className='border rounded-lg'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[80px]'>ID</TableHead>
							<TableHead>Tiêu đề</TableHead>
							<TableHead>Nội dung</TableHead>
							<TableHead className='w-[180px]'>Thời gian</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{notifications.map(
							(noti: Notification): JSX.Element => (
								<TableRow
									key={noti.id}
									className={
										noti.isRead
											? 'text-muted-foreground'
											: 'text-black font-medium'
									}
								>
									<TableCell>{noti.id}</TableCell>

									<TableCell>{noti.title}</TableCell>

									<TableCell>{noti.message}</TableCell>

									<TableCell>{noti.createdAt}</TableCell>
								</TableRow>
							),
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
