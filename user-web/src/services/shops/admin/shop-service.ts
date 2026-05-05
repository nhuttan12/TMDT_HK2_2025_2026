import { ShopProfile } from '@/types/shops/admin/ShopProfile';

const mockShopProfile: ShopProfile = {
	name: 'Terrarium VN - Rừng trong kính',
	email: 'contact@terrarium.vn',
	phone: '0909123456',
	description: '<p>Chuyên cung cấp các mẫu bể kính tiểu cảnh nghệ thuật.</p>',
	address: '123 Đường ABC, Phường 5, Quận 3, TP. Hồ Chí Minh',
	facebookUrl: 'https://facebook.com/terrariumvn',
	seoTitle: 'Terrarium VN | Nghệ thuật bể kính tiểu cảnh',
	metaDescription: 'Shop bán Terrarium uy tín hàng đầu Việt Nam.',
	bankName: 'Vietcombank',
	accountName: 'PHAM NHUT TAN',
	accountNumber: '1234567890',
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export async function getShopProfile(): Promise<ShopProfile> {
	await sleep(500); // Giả lập độ trễ API
	return { ...mockShopProfile };
}

export async function updateShopProfile(data: ShopProfile): Promise<ShopProfile> {
	await sleep(800);
	console.log('Service: Updated store info', data);
	return data;
}
