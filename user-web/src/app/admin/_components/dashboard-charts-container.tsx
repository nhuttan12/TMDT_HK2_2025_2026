'use client';

import React from 'react';
import { DashboardChartsUi } from './dashboard-charts-ui';
import { DashboardStatsResponse } from '@/types/analyst/DashboardStatsResponse';
import { useDashboardLogic } from '@/hooks/analyst/use-dashboard-logic';
import { useDashboardStatsQuery } from '@/queries/analyst/use-dashboard-stats-query';
import GlobalLoading from '@/app/loading';

export interface DashboardChartsContainerProps {
	initialData: DashboardStatsResponse;
}

export const DashboardChartsContainer = ({
	initialData,
}: DashboardChartsContainerProps): React.ReactElement => {
	// Gọi logic xử lý UI (bộ lọc thời gian)
	const dashboardLogic = useDashboardLogic();

	// Gọi Query Hook với initialData lấy từ Server Component
	const { data, isLoading, isFetching, refetch } = useDashboardStatsQuery(
		dashboardLogic.timeRange,
		dashboardLogic.startDate,
		dashboardLogic.endDate,
		initialData,
	);

	// Trường hợp fallback nếu initialData lỗi và query đang fetch
	if (isLoading || !data) {
		return <GlobalLoading />;
	}

	// Truyền toàn bộ logic và data xuống Dumb UI Component
	return (
		<DashboardChartsUi
			{...dashboardLogic}
			data={data}
			isFetching={isFetching}
			onRefresh={(): void => {
				refetch();
			}}
		/>
	);
};
