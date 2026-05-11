import SidebarWrapper from '@/components/layout/share/sidebar-wrapper';
import { SidebarItem } from '@/types/uis/SidebarItem';
import {
	FileText,
	ImageIcon,
	LayoutDashboard,
	List,
	Megaphone,
	Package,
	Store,
	Tag,
	Tickets,
	Users,
} from 'lucide-react';
import { Metadata } from 'next';
import React, { JSX } from 'react';

export const metadata: Metadata = {
	title: {
		default: 'Admin',
		template: '%s | Admin',
	},
};

export default function AdminLayout({ children }: { children: React.ReactNode }): JSX.Element {
	const sidebarItems: SidebarItem[] = [
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
			title: 'Khách hàng',
			href: '/admin/users/customers',
			icon: <Users size={18} />,
		},
		{
			title: 'Cửa hàng',
			icon: <Store size={18} />,
			children: [
				{
					title: 'Danh sách cửa hàng',
					href: '/admin/shops/list',
					icon: <List size={18} />,
				},
				{
					title: 'Phê duyệt đăng ký',
					href: '/admin/shops/approvals',
					icon: <FileText size={18} />,
				},
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
					title: 'Hình ảnh khuyến mãi',
					href: '/admin/content/popups',
					icon: <Megaphone size={18} />,
				},

				// ----- MARKETING -----
				{
					title: 'Khuyến mãi sản phẩm của toàn nghành hàng',
					href: '/admin/marketing/platform-promotions',
					icon: <Tag size={18} />,
				},
				{
					title: 'Mã giảm giá chung của toàn nghành hàng',
					href: '/admin/marketing/coupons/platform',
					icon: <Tickets size={18} />,
				},
			],
		},
	];

	return (
		<div className='h-screen bg-slate-50 flex overflow-hidden'>
			{/* SIDEBAR */}
			<div className='ps-3'>
				<SidebarWrapper items={sidebarItems} role='admin'/>
			</div>

			{/* CONTENT WRAPPER */}
			<div className='flex-1 flex flex-col min-h-0 p-3'>
				{/* SCROLL ZONE */}
				<div className='flex-1 overflow-y-auto min-h-0 bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
					{children}
				</div>
			</div>
		</div>
	);
}
