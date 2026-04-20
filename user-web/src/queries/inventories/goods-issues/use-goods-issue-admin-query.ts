import { GoodsIssueList } from '@/types/inventories/issues/uis/GoodsIssueList';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getGoodsIssuesAdmin } from '@/services/inventories/goods-issues/goods-issue-admin-service';

export function useGoodsIssueAdminQuery(
	initialData?: GoodsIssueList[],
): UseQueryResult<GoodsIssueList[], Error> {
	return useQuery({
		queryKey: ['admin-goods-issues'],
		queryFn: getGoodsIssuesAdmin,
		initialData: initialData,
		staleTime: 1000 * 60 * 5, // Cache trong 5 phút
	});
}
