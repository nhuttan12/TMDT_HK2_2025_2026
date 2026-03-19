import React, { JSX } from 'react';
import AdminSidebarWrapper from '@/components/layout/admin/admin-sidebar-wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: {
		default: 'Admin',
		template: '%s | Admin',
	},
};

export default function AdminLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className='h-screen bg-slate-50 flex overflow-hidden'>
			{/* SIDEBAR */}
			<div className='ps-3'>
				<AdminSidebarWrapper />
			</div>

			{/* CONTENT WRAPPER */}
			<div className='flex-1 flex flex-col min-h-0'>
				{/* SCROLL ZONE */}
				<div className='flex-1 overflow-y-auto min-h-0 ps-3 pe-3'>
					<div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6'>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
