'use client';

import { SidebarItem } from '@/types/uis/SidebarItem';
import { JSX } from 'react';
import { SidebarMenuItem } from '../admin/side-bar-menu-item';
import { AppRole } from '@/types/uis/AppRole';
import { LucideIcon, ShieldCheck, Store } from 'lucide-react';

interface SidebarProps {
	items: SidebarItem[];
	role: AppRole;
}

interface RoleBrandConfig {
	title: string;
	Icon: LucideIcon;
	iconBgClass: string;
	iconColorClass: string;
}

const ROLE_BRAND_CONFIGS: Record<AppRole, RoleBrandConfig> = {
	'admin': {
		title: 'Quản trị',
		Icon: ShieldCheck,
		iconBgClass: 'bg-blue-100',
		iconColorClass: 'text-blue-700',
	},
	'shop-owner': {
		title: 'Quản lý cửa hàng',
		Icon: Store,
		iconBgClass: 'bg-teal-100',
		iconColorClass: 'text-teal-700',
	},
};

export default function Sidebar({ items, role }: SidebarProps): JSX.Element {
    const currentBrand: RoleBrandConfig = ROLE_BRAND_CONFIGS[role];
	const BrandIcon: LucideIcon = currentBrand.Icon;

	return (
		<aside className='w-64 h-screen bg-white border-r border-gray-200 flex flex-col'>
			{/* Logo area */}
			<div className='flex items-center h-16 px-6 border-b border-gray-200 gap-3'>
				<div
					className={`flex items-center justify-center w-8 h-8 rounded-lg ${currentBrand.iconBgClass} ${currentBrand.iconColorClass}`}
				>
					<BrandIcon
						className='w-5 h-5'
						strokeWidth={2.5}
					/>
				</div>
				<h1 className='text-lg font-bold tracking-tight text-slate-800'>
					{currentBrand.title}
				</h1>
			</div>

			{/* Navigation */}
			<nav className='flex-1 overflow-y-auto py-4 px-3 space-y-1'>
				{items.map((item, index) => (
					<SidebarMenuItem
						key={index}
						item={item}
					/>
				))}
			</nav>
		</aside>
	);
}
