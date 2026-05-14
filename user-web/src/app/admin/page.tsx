import { getDashboardStats } from '@/services/analyst/dashboard-service';
import React from 'react';
import { DashboardChartsContainer } from './_components/dashboard-charts-container';

export default async function DashboardPage(): Promise<React.ReactElement> {
	// Lấy data trực tiếp từ service ở môi trường Server của NextJS 16
	// Việc này giúp bỏ qua bước loading ở Client, tối ưu SEO và UX
	const initialData = await getDashboardStats();

	return (
		<main className='min-h-screen'>
			<div className='max-w-7xl mx-auto py-8'>
				<h1 className='text-3xl font-extrabold text-slate-900 mb-8 px-6'>
					Tổng hợp thông tin chỉ dữ liệu
				</h1>

				{/* Inject data tĩnh vào Container (Client Component) */}
				<DashboardChartsContainer initialData={initialData} />
			</div>
		</main>
	);
}
