import { ProfileSidebar } from '@/components/user/profile-sidebar';
import { SidebarItemInterface } from '@/types/uis/SidebarItemInterface';
import { KeyRound, Receipt, TicketPercent, User } from 'lucide-react';
import { JSX } from 'react';
import { Separator } from '@/components/ui/separator';

const items: SidebarItemInterface[] = [
	{
		title: 'Thông tin hồ sơ',
		href: '/profile',
		icon: <User className='h-4 w-4' />,
	},
	{
		title: 'Đổi mật khẩu',
		href: '/profile/change-password',
		icon: <KeyRound className='h-4 w-4' />,
	},
	{
		title: 'Đơn mua',
		href: '/profile/invoices',
		icon: <Receipt className='h-4 w-4' />,
	},
	{
		title: 'Mã giảm giá',
		href: '/profile/coupons',
		icon: <TicketPercent className='h-4 w-4' />,
	},
];

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className='min-h-screen bg-slate-50 p-6'>
			<div className='max-w-6xl mx-auto flex gap-6'>
				<ProfileSidebar items={items} />

				<div className='flex-1'>
					<div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
