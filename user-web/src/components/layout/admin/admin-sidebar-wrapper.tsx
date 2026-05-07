'use client';

import dynamic from 'next/dynamic';
import {
	BadgePercent,
	Boxes,
	Download,
	FileText,
	ImageIcon,
	Images,
	LayoutDashboard,
	List,
	Megaphone,
	MessageCircle,
	Package,
	ShoppingCart,
	Store,
	Tag,
	Tickets,
	Truck,
	Upload,
	Users,
	Warehouse,
} from 'lucide-react';
import { ComponentType, JSX } from 'react';
import { SidebarItemInterface } from '@/types/uis/SidebarItemInterface';

const AdminSidebar = dynamic(() => import('./side-bar-admin'), { ssr: false });


const sidebarItems: SidebarItemInterface[] = [
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
				href: '/admin/marketing/shop-promotions',
				icon: <Tag size={18} />,
			},
			{
				title: 'Mã giảm giá của cửa hàng',
				href: '/admin/marketing/coupons/shop',
				icon: <BadgePercent size={18} />,
			},
			{
				title: 'Mã giảm giá chung của toàn nghành hàng',
				href: '/admin/marketing/coupons/platform',
				icon: <Tickets size={18} />,
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


export default function AdminSidebarWrapper(): JSX.Element {
	return <AdminSidebar items={sidebarItems} />;
}
