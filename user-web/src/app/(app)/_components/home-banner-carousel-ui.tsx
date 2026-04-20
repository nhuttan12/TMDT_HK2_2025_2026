'use client';

import { JSX, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { HomeBanner } from '@/types/uis/HomeBanner';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

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
				{banners.map(
					(banner: HomeBanner): JSX.Element => (
						<CarouselItem
							key={banner.id}
							className='basis-full'
						>
							<a href={banner.redirectUrl}>
								<Image
									src={banner.imageUrl}
									alt={banner.title}
									width={1600}
									height={400}
									className='w-full h-[400px] object-cover rounded-xl'
									priority
								/>
							</a>
						</CarouselItem>
					),
				)}
			</CarouselContent>
		</Carousel>
	);
}
