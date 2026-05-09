'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarItem } from '@/types/uis/SidebarItem';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { Separator } from '@/components/ui/separator';

interface Props {
	items: SidebarItem[];
}

export function ProfileSidebar({ items }: Props): JSX.Element {
	const pathname: string = usePathname();

	return (
		<Card className='w-64 h-fit p-4 rounded-2xl border border-slate-200 shadow-sm'>
			<div className='space-y-1'>
				{items.map((item: SidebarItem, index: number): JSX.Element => {
					const isActive: boolean = pathname === item.href;

					return (
						<div key={item.href}>
							<Link href={item.href!}>
								<div
									className={cn(
										'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all',
										isActive
											? 'bg-slate-900 text-white'
											: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
									)}
								>
									{item.icon}
									<span className='font-medium'>{item.title}</span>
								</div>
							</Link>

							{index !== items.length - 1 && <Separator className='my-2' />}
						</div>
					);
				})}
			</div>
		</Card>
	);
}
