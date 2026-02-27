import React, { JSX } from 'react';
import AdminSidebarWrapper from '@/components/admin/admin-sidebar-wrapper';

export default function AdminLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className='h-screen bg-slate-50'>
			<div className='flex gap-3'>
				<AdminSidebarWrapper />

				<div className='flex-1'>
					<div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
