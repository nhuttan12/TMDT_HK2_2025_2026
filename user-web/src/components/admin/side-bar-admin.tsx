'use client';

import { usePathname } from 'next/navigation';
import {
	Boxes,
	CalendarCheck,
	CheckCircle2,
	ClipboardList,
	Download,
	History,
	IdCard,
	ImageIcon,
	Images,
	LayoutDashboard,
	Megaphone,
	Package,
	Settings,
	Shield,
	ShoppingCart,
	Tag,
	TicketPercent,
	Truck,
	Upload,
	User,
	UserCog,
	Users,
	Warehouse,
	Zap,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { JSX } from 'react';
import { SidebarItemInterface } from '@/types/uis/SidebarItemInterface';
import SidebarItem from '@/components/admin/side-bar-item';

const sidebarData: SidebarItemInterface[] = [
	{
		title: 'Dashboard',
		href: '/admin',
		icon: <LayoutDashboard size={18} />,
	},
	{
		title: 'Sản phẩm',
		icon: <Package size={18} />,
		children: [
			{ title: 'Danh sách', href: '/admin/products', icon: <Package size={18} /> },
			{ title: 'Danh mục', href: '/admin/categories', icon: <Package size={18} /> },
		],
	},
	{
		title: 'Đơn hàng',
		href: '/admin/orders',
		icon: <ShoppingCart size={18} />,
	},
	{
		title: 'Kho',
		icon: <Warehouse size={18} />,
		children: [
			{
				title: 'Phiếu nhập kho',
				href: '/admin/inventory/imports',
				icon: <Download size={18} />,
			},
			{
				title: 'Phiếu xuất kho',
				href: '/admin/inventory/exports',
				icon: <Upload size={18} />,
			},
			{
				title: 'Sản phẩm tồn kho',
				href: '/admin/inventory/stocks',
				icon: <Boxes size={18} />,
			},
			{
				title: 'Nhà cung cấp',
				href: '/admin/inventory/suppliers',
				icon: <Truck size={18} />,
			},
			{
				title: 'Lịch sử xuất nhập',
				href: '/admin/inventory/history',
				icon: <History size={18} />,
			},
		],
	},
	{
		title: 'Người dùng',
		icon: <Users size={18} />,
		children: [
			{
				title: 'Khách hàng',
				href: '/admin/users/customers',
				icon: <Users size={18} />,
			},
			{
				title: 'Nhân viên',
				href: '/admin/users/staff',
				icon: <UserCog size={18} />,
			},
			{
				title: 'Phân quyền nhân viên',
				href: '/admin/users/staff/roles',
				icon: <Shield size={18} />,
			},
			{
				title: 'Lịch chấm công',
				href: '/admin/users/attendance',
				icon: <CalendarCheck size={18} />,
			},
			{
				title: 'Nhiệm vụ phân công',
				href: '/admin/users/tasks',
				icon: <ClipboardList size={18} />,
			},
		],
	},
	{
		title: 'Nội dung & Marketing',
		icon: <ImageIcon size={18} />,
		children: [
			// ----- CONTENT -----
			{
				title: 'Banner trang chủ',
				href: '/admin/content/banners',
				icon: <ImageIcon size={18} />,
			},
			{
				title: 'Slider / Carousel',
				href: '/admin/content/sliders',
				icon: <Images size={18} />,
			},
			{
				title: 'Popup khuyến mãi',
				href: '/admin/content/popups',
				icon: <Megaphone size={18} />,
			},

			// ----- MARKETING -----
			{
				title: 'Khuyến mãi sản phẩm',
				href: '/admin/marketing/promotions',
				icon: <Tag size={18} />,
			},
			{
				title: 'Mã giảm giá',
				href: '/admin/marketing/coupons',
				icon: <TicketPercent size={18} />,
			},
			{
				title: 'Flash Sale',
				href: '/admin/marketing/flash-sales',
				icon: <Zap size={18} />,
			},
		],
	},
	{
		title: 'Cá nhân',
		icon: <User size={18} />,
		children: [
			{
				title: 'Thông tin cá nhân',
				href: '/admin/me/profile',
				icon: <IdCard size={18} />,
			},
			{
				title: 'Nhiệm vụ trong ngày',
				href: '/admin/me/today-tasks',
				icon: <CheckCircle2 size={18} />,
			},
		],
	},
	{
		title: 'Cài đặt',
		href: '/admin/settings',
		icon: <Settings size={18} />,
	},
];

export default function AdminSidebar(): JSX.Element {
	const pathname: string = usePathname();

	return (
		<aside className='h-screen w-64 border-r rounded-xl shadow-lg bg-background flex flex-col'>
			<div className='h-16 flex items-center px-6 font-bold text-lg'>Admin Panel</div>

			<Separator />

			<ScrollArea className='flex-1 px-3 py-4'>
				<div className='space-y-2'>
					{sidebarData.map(
						(item: SidebarItemInterface, index: number): JSX.Element => (
							<SidebarItem
								key={index}
								item={item}
								pathname={pathname}
							/>
						),
					)}
				</div>
			</ScrollArea>
		</aside>
	);
}
