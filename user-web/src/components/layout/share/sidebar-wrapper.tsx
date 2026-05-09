'use client';

import { SidebarItem } from '@/types/uis/SidebarItem';
import dynamic from 'next/dynamic';
import { JSX } from 'react';

const Sidebar = dynamic(() => import('./side-bar'), { ssr: false });

interface SidebarWrapperProps {
	items: SidebarItem[];
}

export default function SidebarWrapper({items}: SidebarWrapperProps): JSX.Element {
	return <Sidebar items={items} />;
}
