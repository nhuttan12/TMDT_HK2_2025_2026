import SidebarWrapper from '@/components/layout/share/sidebar-wrapper';
import { SidebarItem } from '@/types/uis/SidebarItem';
import {
    BadgePercent,
    Boxes,
    Download,
    ImageIcon,
    Images,
    LayoutDashboard,
    MessageCircle,
    Package,
    ShoppingCart,
    Store,
    Tag,
    Truck,
    Upload,
    Warehouse
} from 'lucide-react';
import { Metadata } from 'next';
import React, { JSX } from 'react';

export const metadata: Metadata = {
	title: {
		default: 'Quản lý cửa hàng',
		template: '%s | Quản lý cửa hàng',
	},
};

export default function AdminLayout({ children }: { children: React.ReactNode }): JSX.Element {
	const sidebarItems: SidebarItem[] = [
		{
			title: 'Dashboard',
			href: '/shop-owner',
			icon: <LayoutDashboard size={18} />,
		},
		{
			title: 'Sản phẩm',
			icon: <Package size={18} />,
			children: [
				{ title: 'Danh sách', href: '/shop-owner/products', icon: <Package size={18} /> },
			],
		},
		{
			title: 'Đơn hàng',
			href: '/shop-owner/invoices',
			icon: <ShoppingCart size={18} />,
		},
		{
			title: 'Kho',
			icon: <Warehouse size={18} />,
			children: [
				{
					title: 'Phiếu nhập kho',
					href: '/shop-owner/inventories/receipts',
					icon: <Download size={18} />,
				},
				{
					title: 'Phiếu xuất kho',
					href: '/shop-owner/inventories/issues',
					icon: <Upload size={18} />,
				},
				{
					title: 'Sản phẩm tồn kho',
					href: '/shop-owner/inventories/stocks',
					icon: <Boxes size={18} />,
				},
				{
					title: 'Nhà cung cấp',
					href: '/shop-owner/inventories/suppliers',
					icon: <Truck size={18} />,
				},
			],
		},
		{
			title: 'Nhắn tin với khách hàng',
			href: '/shop-owner/users/shops/messages',
			icon: <MessageCircle size={18} />,
		},
		{
			title: 'Nội dung & Marketing',
			icon: <ImageIcon size={18} />,
			children: [
				// ----- CONTENT -----
				{
					title: 'Ảnh quảng cáo',
					href: '/shop-owner/content/shop-banners',
					icon: <Images size={18} />,
				},

				// ----- MARKETING -----
				{
					title: 'Khuyến mãi sản phẩm của cửa hàng',
					href: '/shop-owner/marketing/shop-promotions',
					icon: <Tag size={18} />,
				},
				{
					title: 'Mã giảm giá của cửa hàng',
					href: '/shop-owner/marketing/coupons/shop',
					icon: <BadgePercent size={18} />,
				},
			],
		},
		// {
		// 	title: 'Thông tin cá nhân',
		// 	href: '/shop-owner/me/profile',
		// 	icon: <User size={18} />,
		// },
		{
			title: 'Thông tin cửa hàng',
			href: '/shop-owner/shop-info',
			icon: <Store size={18} />,
		},
		// {
		// 	title: 'Cài đặt',
		// 	href: '/shop-owner/settings',
		// 	icon: <Settings size={18} />,
		// },
	];

	return (
		<div className='h-screen bg-slate-50 flex overflow-hidden'>
			{/* SIDEBAR */}
			<div className='ps-3'>
				<SidebarWrapper items={sidebarItems} role='shop-owner'/>
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
