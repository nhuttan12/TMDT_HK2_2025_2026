'use client';

import { useRevenueDashboardLogic } from '@/hooks/analyst/use-revenue-dashboard-logic';
import { useCategoryRevenueQuery } from '@/queries/analyst/use-category-revenue-query';
import { useDailyRevenueQuery } from '@/queries/analyst/use-daily-revenue-query';
import { JSX } from 'react';
import { RevenueDashboardUI } from './revenue-dashboard-ui';
// Giả định các file tanstack query đã được khai báo theo quy chuẩn đặt tên

export function RevenueDashboardContainer(): JSX.Element {
  const logic = useRevenueDashboardLogic();
  
  // Gọi data từ service thông qua TanStack Query dựa trên bộ lọc state
  const { data: dailyData, isLoading: isDailyLoading } = useDailyRevenueQuery(
    logic.dateRange.start, 
    logic.dateRange.end
  );
  const { data: categoryData, isLoading: isCategoryLoading } = useCategoryRevenueQuery(
    logic.selectedMonth
  );

  return (
    <RevenueDashboardUI 
      logic={logic}
      chartData={dailyData ?? []}
      categoryData={categoryData ?? []}
      isLoading={isDailyLoading || isCategoryLoading}
    />
  );
}