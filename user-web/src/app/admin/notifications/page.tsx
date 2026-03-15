import { JSX } from 'react';
import { Notification } from '@/types/shared/notification/Notification';
import NotificationTable from '@/app/admin/notifications/_components/notification-table';

const notifications: Notification[] = [
	{
		id: 1,
		title: 'Đơn hàng mới',
		message: 'Khách hàng vừa tạo đơn hàng',
		createdAt: '2026-03-12 22:10',
		isRead: false,
	},
	{
		id: 2,
		title: 'Sản phẩm sắp hết',
		message: 'Adidas UltraBoost còn 2 sản phẩm',
		createdAt: '2026-03-12 21:40',
		isRead: true,
	},
];

export default function Page(): JSX.Element {
	return <NotificationTable notifications={notifications} />;
}
