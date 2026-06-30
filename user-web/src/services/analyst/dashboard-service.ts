import { DashboardStatsResponse } from '@/types/analyst/DashboardStatsResponse';
import { TimeRange } from '@/types/uis/TimeRange';

export const getDashboardStats = async (
	timeRange: TimeRange,
	startDate: string,
	endDate: string,
): Promise<DashboardStatsResponse> => {
	// Giả lập độ trễ mạng
	await new Promise((resolve) => setTimeout(resolve, 500));

	const mockData: DashboardStatsResponse = {
		statusStructure: [
			{ status: 'completed', count: 1250 },
			{ status: 'processing', count: 430 }, // Đổi từ 'shipping' sang 'processing'
			{ status: 'pending', count: 210 },
			{ status: 'cancelled', count: 55 },
			{ status: 'returned', count: 12 }, // Có thể bổ sung thêm trạng thái trả hàng
		],
		gmvFluctuation: [
			{ date: '2024-05-01T08:00:00Z', value: 15000000 },
			{ date: '2024-05-02T14:30:00Z', value: 18500000 },
			{ date: '2024-05-03T09:15:00Z', value: 16200000 },
			{ date: '2024-05-04T16:45:00Z', value: 22000000 },
		],
		invoiceVolume: [
			{ date: '2024-05-01T08:00:00Z', value: 120 },
			{ date: '2024-05-02T14:30:00Z', value: 150 },
			{ date: '2024-05-03T09:15:00Z', value: 135 },
			{ date: '2024-05-04T16:45:00Z', value: 180 },
		],
	};

	return mockData;
};
