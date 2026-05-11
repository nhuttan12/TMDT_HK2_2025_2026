'use client';

import { JSX, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { HomeBanner } from '@/types/contents/home-banners/HomeBanner';

interface BannerProps {
	banners: HomeBanner[];
}

export default function HomeBannerCarouselUi({ banners }: BannerProps): JSX.Element {
	const autoPlay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

	return (
		<Carousel
			opts={{ align: 'start', loop: true }}
			plugins={[autoPlay.current]}
			className='w-full'
		>
			<CarouselContent>
				{[...banners]
					.sort((a, b) => a.order - b.order)
					.map(
						(banner: HomeBanner): JSX.Element => (
							<CarouselItem
								key={banner.id}
								className='basis-full'
							>
								{/* <a href={banner.redirectUrl}> */}
								<Image
									src={banner.url}
									// Tự động generate alt text để tốt cho SEO
									alt={
										banner.isPrimary
											? 'Banner chính TerraCraft'
											: `Banner sự kiện ${banner.order}`
									}
									width={1600}
									height={400}
									// 2. Thay h-100 bằng h-[400px] để Tailwind hiểu và crop ảnh đúng chuẩn
									className='object-cover w-full h-100 rounded-xl'
									priority={banner.isPrimary} // Chỉ ưu tiên load nhanh cho ảnh Primary
								/>
								{/* </a> */}
							</CarouselItem>
						),
					)}
			</CarouselContent>
		</Carousel>
	);
}
