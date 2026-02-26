import ProductList from '../../components/product-list';
import { JSX } from 'react';
import HomeBannerCarousel from '@/components/home-banner-carousel';
import { HomeBanner } from '@/types/uis/HomeBanner';
import Link from 'next/link';

const homeBanners: HomeBanner[] = [
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
];

export default function Index(): JSX.Element {
	return (
		<>
			{/* HERO BANNER */}
			<div className='w-full'>
				<HomeBannerCarousel banners={homeBanners} />
			</div>

			{/* PRODUCT SECTION */}
			<section className='max-w-7xl mx-auto mt-10 space-y-6'>
				<div className='flex items-center justify-between'>
					<h3 className='text-2xl md:text-3xl font-bold text-gray-900'>Gợi ý cho bạn</h3>

					<Link
						href='/products'
						className='text-sm font-medium text-primary hover:underline transition'
					>
						<h2>Xem tất cả →</h2>
					</Link>
				</div>

				<div>
					<ProductList />
				</div>
			</section>
		</>
	);
}
