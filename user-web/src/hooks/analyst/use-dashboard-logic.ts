'use client';

import { useState } from 'react';

export interface DashboardLogicReturn {
	timeRange: string;
	handleTimeRangeChange: (newRange: string) => void;
	handleRefreshChart: () => void;
}

export const useDashboardLogic = (): DashboardLogicReturn => {
	const [timeRange, setTimeRange] = useState<string>('7_days');

	const handleTimeRangeChange = (newRange: string): void => {
		setTimeRange(newRange);
		// Logic gọi API hoặc filter data nội bộ sẽ nằm ở đây
	};

	const handleRefreshChart = (): void => {
		console.log('Refreshing charts for range:', timeRange);
	};

	return {
		timeRange,
		handleTimeRangeChange,
		handleRefreshChart,
	};
};
