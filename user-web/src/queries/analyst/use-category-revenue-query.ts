'use client';

import { apiClient } from '@/lib/api-client';
import { AnalystService } from '@/services/analyst/revenue-service';
import { CategoryRevenue } from '@/types/analyst/CategoryRevenue';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useCategoryRevenueQuery(month: string): UseQueryResult<CategoryRevenue[], Error> {
	const analystService = new AnalystService(apiClient);

	return useQuery({
		queryKey: ['categoryRevenue', month],
		queryFn: (): Promise<CategoryRevenue[]> => analystService.getCategoryRevenueData(month),
		staleTime: 1000 * 60 * 5,
	});
}
