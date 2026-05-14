import { ShopProfile } from "./ShopProfile";
import { ShopStatus } from "./ShopStatus";

export interface ShopAdminDetail extends ShopProfile {
	status: ShopStatus;
	rating: number;
	createdAt: string;

	// Có thể mở rộng thêm các chỉ số kinh doanh để Admin đánh giá
	totalProducts: number;
	totalOrders: number;
	reportedCount: number; // Số lần bị report
}
