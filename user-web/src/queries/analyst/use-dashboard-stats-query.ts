import { getDashboardStats } from "@/services/analyst/dashboard-service";
import { DashboardStatsResponse } from "@/types/analyst/DashboardStatsResponse";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useDashboardStatsQuery = (
	initialData?: DashboardStatsResponse,
): UseQueryResult<DashboardStatsResponse, Error> => {
	return useQuery<DashboardStatsResponse, Error>({
		queryKey: ['dashboard-stats'],
		queryFn: () => getDashboardStats(),
		initialData: initialData,
		staleTime: 1000 * 60 * 5, // Cache 5 phút
	});
};
