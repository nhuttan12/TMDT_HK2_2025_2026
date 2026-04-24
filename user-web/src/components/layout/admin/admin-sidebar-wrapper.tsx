'use client';

import dynamic from 'next/dynamic';
import { ComponentType, JSX } from 'react';

const AdminSidebar: ComponentType = dynamic(() => import('./side-bar-admin'), { ssr: false });

export default function AdminSidebarWrapper(): JSX.Element {
	return <AdminSidebar />;
}
