import { getDashboardStats } from '@/services/analyst/dashboard-service';
import React from 'react';
import { DashboardChartsContainer } from './_components/dashboard-charts-container';

const getDefaultDateRange = (): { startDate: string; endDate: string } => {
    const endDate: string = new Date().toISOString();
    const startDate: string = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    return { startDate, endDate };
};

export default async function DashboardPage(): Promise<React.ReactElement> {
	const { startDate, endDate } = getDefaultDateRange();

	const initialData = await getDashboardStats('day', startDate, endDate);

	return <DashboardChartsContainer initialData={initialData} />;
}
