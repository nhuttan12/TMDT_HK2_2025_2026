import { TimeRange } from '@/types/uis/TimeRange';

const TIME_RANGE_MAP: Record<TimeRange, string> = {
	day: 'Ngày',
	month: 'Tháng',
	year: 'Năm',
};

export const getTimeRangeLabel = (timeRange: TimeRange): string => {
	return TIME_RANGE_MAP[timeRange];
};
