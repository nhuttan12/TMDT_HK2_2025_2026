import { getCategoryRevenueData } from '@/services/analyst/revenue-service';
import { CategoryRevenue } from '@/types/analyst/CategoryRevenue';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useCategoryRevenueQuery(month: string): UseQueryResult<CategoryRevenue[], Error> {
	return useQuery({
		queryKey: ['categoryRevenue', month],
		queryFn: (): Promise<CategoryRevenue[]> => getCategoryRevenueData(month),
		staleTime: 1000 * 60 * 5,
	});
}
