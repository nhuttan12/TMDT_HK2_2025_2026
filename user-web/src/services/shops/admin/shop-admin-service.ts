import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ShopAdmin } from '@/types/shops/admin/ShopAdmin';
import { ShopProfile } from '@/types/shops/admin/ShopProfile';

export async function getShopProfileByUserId(userId: number): Promise<ShopProfile> {
	await new Promise((resolve) => setTimeout(resolve, 500)); // Giả lập độ trễ API
	return {
		id: 88,
		name: 'Terrarium VN - Rừng trong kính',
		email: 'contact@terrarium.vn',
		phone: '0909123456',
		description: '<p>Chuyên cung cấp các mẫu bể kính tiểu cảnh nghệ thuật.</p>',
		address: '123 Đường ABC, Phường 5, Quận 3, TP. Hồ Chí Minh',

		// Hình ảnh
		logoUrl:
			'https://www.shutterstock.com/image-vector/logo-terrarium-succulents-mini-garden-260nw-694576459.jpg',

		seoTitle: 'Terrarium VN | Nghệ thuật bể kính tiểu cảnh',
		metaDescription: 'Shop bán Terrarium uy tín hàng đầu Việt Nam.',
		bankName: 'Vietcombank',
		accountName: 'PHAM NHUT TAN',
		accountNumber: '1234567890',
	};
}

export async function updateShopProfile(data: ShopProfile): Promise<ShopProfile> {
	await new Promise((resolve) => setTimeout(resolve, 800)); // Giả lập độ trễ API
	console.log('Service: Updated store info', data);
	return data;
}

export const getAdminShops = async (
	page: number = 1,
	name?: string,
	status?: string,
): Promise<PaginationResponse<ShopAdmin>> => {
	// Giả lập delay mạng
	await new Promise((resolve) => setTimeout(resolve, 800));
	const limit = 10;

	// Mock Data
	let mockData: ShopAdmin[] = Array.from({ length: 45 }).map((_, i) => ({
		id: i + 1,
		name: `Cửa hàng ${i + 1} ${i % 2 === 0 ? 'Official' : 'Store'}`,
		email: `shop${i + 1}@example.com`,
		phone: `0909000${i.toString().padStart(3, '0')}`,
		status: i % 5 === 0 ? 'banned' : i % 3 === 0 ? 'inactive' : 'active',
		rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 -> 5.0
		createdAt: new Date(Date.now() - i * 86400000).toISOString(),
	}));

	// Lọc theo search (name)
	if (name) {
		mockData = mockData.filter((shop) => shop.name.toLowerCase().includes(name.toLowerCase()));
	}

	// Lọc theo status
	if (status && status !== 'ALL') {
		mockData = mockData.filter((shop) => shop.status === status);
	}

	// Phân trang
	const totalItems = mockData.length;
	const totalPages = Math.ceil(totalItems / limit);
	const paginatedData = mockData.slice((page - 1) * limit, page * limit);

	return {
		data: paginatedData,
		meta: {
			totalItems: totalItems,
			totalPages: totalPages || 1,
			currentPage: page,
			itemsPerPage: limit,
		},
	};
};
