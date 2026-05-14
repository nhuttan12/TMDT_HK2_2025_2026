'use client';

import { AppRole } from '@/types/uis/AppRole';
import { SidebarItem } from '@/types/uis/SidebarItem';
import dynamic from 'next/dynamic';
import { JSX } from 'react';

const Sidebar = dynamic(() => import('./side-bar'), { ssr: false });

interface SidebarWrapperProps {
	items: SidebarItem[];
	role: AppRole;
}

export default function SidebarWrapper({items, role}: SidebarWrapperProps): JSX.Element {
	return <Sidebar items={items} role={role}/>;
}
