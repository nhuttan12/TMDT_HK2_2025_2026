import { ShopAdminDetail } from '@/types/shops/admin/ShopAdminDetail';

export const getShopAdminDetail = async (id: string): Promise<ShopAdminDetail> => {
	await new Promise((resolve) => setTimeout(resolve, 500)); // Fake network delay

	return {
		id: id,
		name: `Cửa hàng Terrarium Official`,
		email: `contact@shopterrarium.vn`,
		phone: '0909123456',
		description: '<p>Chuyên cung cấp các sản phẩm chất lượng cao.</p>',
		address: '123 Đường ABC, Phường 5, Quận 3, TP. Hồ Chí Minh',
		logoUrl:
			'https://www.shutterstock.com/image-vector/logo-terrarium-succulents-mini-garden-260nw-694576459.jpg',
		bankName: 'Vietcombank',
		accountName: 'NGUYEN VAN A',
		accountNumber: '1234567890',

		// Admin fields
		status: 'active',
		rating: 4.8,
		createdAt: '2025-10-20T10:00:00Z',
		totalProducts: 125,
		totalOrders: 4500,
		reportedCount: 0,
	};
};
