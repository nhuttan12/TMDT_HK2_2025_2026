'use client';

import { ShopUserCard } from '@/types/shops/user/ShopUserCard';
import { JSX } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';

interface ShopCardProps {
	shop: ShopUserCard;
}

export default function ShopCard({ shop }: ShopCardProps): JSX.Element {
	return (
		<Link
			href={`/shop/${shop.id}`}
			className='block group'
		>
			<div className='flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow bg-white h-full cursor-pointer'>
				<Avatar className='w-20 h-20 mb-4 group-hover:scale-105 transition-transform'>
					<AvatarImage
						src={shop.avatarUrl}
						alt={shop.name}
					/>
					<AvatarFallback>{shop.name.charAt(0)}</AvatarFallback>
				</Avatar>
				<h3 className='text-lg font-bold text-gray-800 text-center group-hover:text-emerald-600 transition-colors'>
					{shop.name}
				</h3>
				<p className='text-sm text-gray-500 line-clamp-2 text-center mt-2'>
					{shop.description}
				</p>
				<p className='text-sm font-semibold text-emerald-600 mt-3'>
					{shop.totalProducts} Sản phẩm
				</p>
			</div>
		</Link>
	);
}
