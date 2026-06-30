import { CategoryRevenue } from '@/types/analyst/CategoryRevenue';
import { GetRevenueByDayParams } from '@/types/analyst/GetRevenueByDayParams';
import { RevenueChartItem } from '@/types/analyst/RevenueChartItem';
import { type AxiosInstance } from 'axios';

export async function getDailyRevenueDataMocking(
	startDate: string,
	endDate: string,
): Promise<RevenueChartItem[]> {
	// Mock data tinh gọn theo tiêu chí doanh thu cơ bản
	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffTime = Math.abs(end.getTime() - start.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	// Kịch bản 1: Dưới 31 ngày (Hiển thị theo ngày)
	if (diffDays <= 31) {
		return [
			{ label: '20/06', revenue: 14500000 },
			{ label: '21/06', revenue: 19200000 },
			{ label: '22/06', revenue: 11000000 },
			{ label: '23/06', revenue: 23400000 },
		];
	}

	// Kịch bản 2: Từ 32 đến 90 ngày (Hiển thị theo tuần)
	if (diffDays <= 90) {
		return [
			{ label: 'Tuần 1 T4', revenue: 85000000 },
			{ label: 'Tuần 2 T4', revenue: 92000000 },
			{ label: 'Tuần 3 T4', revenue: 78000000 },
			{ label: 'Tuần 4 T4', revenue: 115000000 },
			{ label: 'Tuần 1 T5', revenue: 95000000 },
		];
	}

	// Kịch bản 3: Trên 90 ngày (Hiển thị theo tháng)
	return [
		{ label: 'Tháng 4', revenue: 370000000 },
		{ label: 'Tháng 5', revenue: 410000000 },
		{ label: 'Tháng 6', revenue: 395000000 },
	];
}

export async function getCategoryRevenueDataMocking(month: string): Promise<CategoryRevenue[]> {
	return [
		{ categoryName: 'Cây thủy sinh & Rêu', revenue: 125000000, percentage: 45 },
		{ categoryName: 'Bể kính & Phụ kiện', revenue: 83000000, percentage: 30 },
		{ categoryName: 'Đèn & Hệ thống lọc', revenue: 41500000, percentage: 15 },
		{ categoryName: 'Phân nền & Dinh dưỡng', revenue: 27800000, percentage: 10 },
	];
}

export class AnalystService {
	constructor(private api: AxiosInstance) {}

	async getDailyRevenueData(request: GetRevenueByDayParams): Promise<RevenueChartItem[]> {
		try {
			const flatParams = {
				...request,
			};

			const response = await this.api.get(`/admin/analyst/revenue-by-time`, {
				params: flatParams,
			});

			console.log('receipt data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				return await getDailyRevenueDataMocking(request.startDate, request.endDate);
			}

			return response.data.data;
		} catch (error) {
			console.error(error);
			return await getDailyRevenueDataMocking(request.startDate, request.endDate);
		}
	}

	async getCategoryRevenueData(month: string): Promise<CategoryRevenue[]> {
		try {
			const flatParams = {
				month,
			};

			const response = await this.api.get(`/admin/analyst/category-revenue`, {
				params: flatParams,
			});

			console.log('receipt data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				return await getCategoryRevenueDataMocking(month);
			}

			return response.data.data;
		} catch (error) {
			console.error(error);
			return await getCategoryRevenueDataMocking(month);
		}
	}
}
