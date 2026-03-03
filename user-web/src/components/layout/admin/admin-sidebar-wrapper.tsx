'use client';

import dynamic from 'next/dynamic';

const AdminSidebar = dynamic(() => import('./side-bar-admin'), { ssr: false });

export default function AdminSidebarWrapper() {
	return <AdminSidebar />;
}
