import { CategoryRevenue } from '@/types/analyst/CategoryRevenue';
import { RevenueChartItem } from '@/types/analyst/RevenueChartItem';

export async function getDailyRevenueData(
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

export async function getCategoryRevenueData(month: string): Promise<CategoryRevenue[]> {
	return [
		{ categoryName: 'Điện tử & Tiện ích', revenue: 125000000, percentage: 45 },
		{ categoryName: 'Thời trang & Phụ kiện', revenue: 83000000, percentage: 30 },
		{ categoryName: 'Đồ gia dụng', revenue: 41500000, percentage: 15 },
		{ categoryName: 'Mỹ phẩm & Chăm sóc cá nhân', revenue: 27800000, percentage: 10 },
	];
}
