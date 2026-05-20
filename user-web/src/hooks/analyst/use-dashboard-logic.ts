'use client';

import { TimeRange } from '@/types/uis/TimeRange';
import { useState } from 'react';

export interface DashboardLogicReturn {
	timeRange: TimeRange;
	startDate: string;
	endDate: string;
	onTimeRangeChange: (newRange: TimeRange) => void;
	onDateRangeChange: (start: string, end: string) => void;
}

export const useDashboardLogic = (): DashboardLogicReturn => {
	const [timeRange, setTimeRange] = useState<TimeRange>('day');
	const [startDate, setStartDate] = useState<string>(() =>
		new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
	);
	const [endDate, setEndDate] = useState<string>(new Date().toISOString());

	const onTimeRangeChange = (newRange: TimeRange): void => {
		setTimeRange(newRange);
	};

	const onDateRangeChange = (start: string, end: string): void => {
		if (start) setStartDate(new Date(start).toISOString());
		if (end) setEndDate(new Date(end).toISOString());
	};

	return {
		timeRange,
		startDate,
		endDate,
		onTimeRangeChange,
		onDateRangeChange,
	};
};
