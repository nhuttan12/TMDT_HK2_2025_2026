import { HomeBanner } from '@/types/uis/HomeBanner';

export async function getHomeBanners(): Promise<HomeBanner[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					title: 'Flash Sale 50% - Chỉ hôm nay',
					imageUrl:
						'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1600&auto=format&fit=crop',
					redirectUrl: '/flash-sale',
				},
				{
					id: 2,
					title: 'Bộ sưu tập Xuân 2026',
					imageUrl:
						'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1600&auto=format&fit=crop',
					redirectUrl: '/collections/spring-2026',
				},
				{
					id: 3,
					title: 'Mua 2 giảm thêm 10%',
					imageUrl:
						'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop',
					redirectUrl: '/promotion/buy-2-save-10',
				},
				{
					id: 4,
					title: 'Freeship toàn quốc',
					imageUrl:
						'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop',
					redirectUrl: '/freeship',
				},
			]);
		}, 500);
	});
}
