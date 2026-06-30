'use client';

import { useState } from 'react';

export interface RevenueDashboardLogicReturn {
	dateRange: { start: string; end: string };
	selectedMonth: string;
	handleStartDateChange: (date: string) => void;
	handleEndDateChange: (date: string) => void;
	handleMonthChange: (month: string) => void;
}

export function useRevenueDashboardLogic(): RevenueDashboardLogicReturn {
	// Ưu tiên suy luận kiểu dữ liệu (Type Inference) cho state nội bộ
	const [dateRange, setDateRange] = useState({ start: '2026-06-19', end: '2026-06-25' });
    const currentMonth = (new Date().getMonth() + 1).toString();
    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

	const handleStartDateChange = (date: string): void => {
		setDateRange((prev) => ({ ...prev, start: date }));
	};

	const handleEndDateChange = (date: string): void => {
		setDateRange((prev) => ({ ...prev, end: date }));
	};

	const handleMonthChange = (month: string): void => {
		setSelectedMonth(month);
	};

	return {
		dateRange,
		selectedMonth,
		handleStartDateChange,
		handleEndDateChange,
		handleMonthChange,
	};
}
