'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
	Boxes,
	Download,
	ImageIcon,
	Images,
	LayoutDashboard,
	Megaphone,
	MessageCircle,
	Package,
	ShoppingCart,
	Store,
	Tag,
	TicketPercent,
	Truck,
	Upload,
	Users,
	Warehouse,
	Zap,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { JSX } from 'react';
import { SidebarItemInterface } from '@/types/uis/SidebarItemInterface';
import SidebarItem from '@/components/layout/admin/side-bar-item';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
		href: '/admin/invoices',
		icon: <ShoppingCart size={18} />,
	},
	{
		title: 'Kho',
		icon: <Warehouse size={18} />,
		children: [
			{
				title: 'Phiếu nhập kho',
				href: '/admin/inventories/receipts',
				icon: <Download size={18} />,
			},
			{
				title: 'Phiếu xuất kho',
				href: '/admin/inventories/issues',
				icon: <Upload size={18} />,
			},
			{
				title: 'Sản phẩm tồn kho',
				href: '/admin/inventories/stocks',
				icon: <Boxes size={18} />,
			},
			{
				title: 'Nhà cung cấp',
				href: '/admin/inventories/suppliers',
				icon: <Truck size={18} />,
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
				title: 'Cửa hàng',
				href: '/admin/users/shops',
				icon: <Store size={18} />,
			},
			{
				title: 'Nhắn tin với khách hàng',
				href: '/admin/users/shops/messages',
				icon: <MessageCircle size={18} />,
			},
			// {
			// 	title: 'Nhân viên',
			// 	href: '/admin/users/staffs',
			// 	icon: <UserCog size={18} />,
			// },
			// {
			// 	title: 'Phân quyền nhân viên',
			// 	href: '/admin/users/roles',
			// 	icon: <Shield size={18} />,
			// },
			// {
			// 	title: 'Nhiệm vụ phân công',
			// 	href: '/admin/users/tasks',
			// 	icon: <ClipboardList size={18} />,
			// },
		],
	},
	{
		title: 'Nội dung & Marketing',
		icon: <ImageIcon size={18} />,
		children: [
			// ----- CONTENT -----
			{
				title: 'Ảnh bìa',
				href: '/admin/content/home-banners',
				icon: <ImageIcon size={18} />,
			},
			{
				title: 'Ảnh quảng cáo',
				href: '/admin/content/shop-banners',
				icon: <Images size={18} />,
			},
			{
				title: 'Hình ảnh khuyến mãi',
				href: '/admin/content/popups',
				icon: <Megaphone size={18} />,
			},

			// ----- MARKETING -----
			{
				title: 'Khuyến mãi sản phẩm của cửa hàng',
				href: '/admin/marketing/store-product-promotions',
				icon: <Tag size={18} />,
			},
			{
				title: 'Mã giảm giá của cửa hàng',
				href: '/admin/marketing/coupons',
				icon: <TicketPercent size={18} />,
			},
			{
				title: 'Mã giảm giá chung của toàn nghành hàng',
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
	// {
	// 	title: 'Thông tin cá nhân',
	// 	href: '/admin/me/profile',
	// 	icon: <User size={18} />,
	// },
	{
		title: 'Thông tin cửa hàng',
		href: '/admin/shop-info',
		icon: <Store size={18} />,
	},
	// {
	// 	title: 'Cài đặt',
	// 	href: '/admin/settings',
	// 	icon: <Settings size={18} />,
	// },
];

export default function AdminSidebar(): JSX.Element {
	const pathname: string = usePathname();
	const router: AppRouterInstance = useRouter();

	const handleRedirectToShowAllNotification = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		router.push('/admin/notifications');
	};

	return (
		<aside className='h-screen w-64 border-r rounded-xl shadow-lg bg-background flex flex-col'>
			<div className='h-16 flex items-center justify-between px-6'>
				<div className='font-bold text-lg'>Admin Panel</div>

				<DropdownMenu>
					<DropdownMenuTrigger className='cursor-pointer outline-none focus:outline-none focus:ring-0'>
						<div className='relative'>
							<Avatar className='h-9 w-9'>
								<AvatarImage src='/avatar.png' />
								<AvatarFallback>AD</AvatarFallback>
							</Avatar>

							{/* notification dot */}
							<Badge
								className='absolute -top-1 -right-1 h-3 w-3 rounded-full p-0'
								variant='destructive'
							/>
						</div>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						align='start'
						side='right'
						className='w-80'
					>
						<div className='px-3 py-2 font-semibold'>Thông báo</div>

						<div className='max-h-64 overflow-y-auto'>
							<DropdownMenuItem className='flex gap-3'>
								<div className='flex flex-col'>
									<span className='font-medium'>Đơn hàng mới</span>
									<span className='text-sm text-muted-foreground'>
										Khách hàng vừa tạo đơn
									</span>
								</div>
							</DropdownMenuItem>

							<DropdownMenuItem className='flex flex-col items-start'>
								<span className='font-medium'>Sản phẩm sắp hết</span>
								<span className='text-sm text-muted-foreground'>
									Adidas UltraBoost còn 2 sản phẩm
								</span>
							</DropdownMenuItem>

							<DropdownMenuItem className='flex flex-col items-start'>
								<span className='font-medium'>Người dùng mới</span>
								<span className='text-sm text-muted-foreground'>
									Có user mới đăng ký
								</span>
							</DropdownMenuItem>
						</div>

						<div className='border-t mt-2 pt-2'>
							<DropdownMenuItem
								className='justify-center text-sm text-blue-500'
								onClick={(e: React.MouseEvent<HTMLDivElement>): void =>
									handleRedirectToShowAllNotification(e)
								}
							>
								Xem tất cả
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

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
