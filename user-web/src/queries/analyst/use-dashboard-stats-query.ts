import { getDashboardStats } from "@/services/analyst/dashboard-service";
import { DashboardStatsResponse } from "@/types/analyst/DashboardStatsResponse";
import { TimeRange } from "@/types/uis/TimeRange";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useDashboardStatsQuery = (
	timeRange: TimeRange,
	startDate: string,
	endDate: string,
	initialData?: DashboardStatsResponse,
): UseQueryResult<DashboardStatsResponse, Error> => {
	return useQuery<DashboardStatsResponse, Error>({
		queryKey: ['dashboard-stats', timeRange, startDate, endDate],
		queryFn: () => getDashboardStats(timeRange, startDate, endDate),
		initialData: initialData,
		staleTime: 1000 * 60 * 5, // Cache 5 phút
	});
};
