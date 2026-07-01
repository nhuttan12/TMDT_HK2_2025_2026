'use client';

import { apiClient } from '@/lib/api-client';
import { AnalystService } from '@/services/analyst/revenue-service';
import { RevenueChartItem } from '@/types/analyst/RevenueChartItem';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useDailyRevenueQuery(
	startDate: string,
	endDate: string,
): UseQueryResult<RevenueChartItem[], Error> {
	const analystService = new AnalystService(apiClient);

	return useQuery({
		queryKey: ['dailyRevenue', startDate, endDate],
		queryFn: (): Promise<RevenueChartItem[]> =>
			analystService.getDailyRevenueData({ StartDate: startDate, EndDate: endDate }),
		staleTime: 1000 * 60 * 5, // Dữ liệu cũ hợp lệ trong 5 phút
	});
}
