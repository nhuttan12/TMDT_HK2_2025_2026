'use client';

import { SidebarItemInterface } from '@/types/uis/SidebarItemInterface';
import { JSX } from 'react';
import { SidebarMenuItem } from './side-bar-menu-item';

interface AdminSidebarProps {
	items: SidebarItemInterface[];
}

export default function AdminSidebar({ items }: AdminSidebarProps): JSX.Element {
	return (
		<aside className='w-64 h-screen bg-white border-r border-gray-200 flex flex-col'>
			{/* Logo area */}
			<div className='h-16 flex items-center px-6 border-b border-gray-200'>
				<h1 className='font-bold text-xl tracking-tight'>Admin System</h1>
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
