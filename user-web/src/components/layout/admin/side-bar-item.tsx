import { JSX, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { SidebarItemInterface } from '@/types/uis/SidebarItemInterface';

interface ItemProps {
	item: SidebarItemInterface;
	pathname: string;
}

export default function SidebarItem({ item, pathname }: ItemProps): JSX.Element {
	const [open, setOpen] = useState(true);

	// Nếu có children → render collapsible
	if (item.children) {
		return (
			<Collapsible
				open={open}
				onOpenChange={setOpen}
			>
				<CollapsibleTrigger asChild>
					<Button
						variant='ghost'
						className='w-full justify-between cursor-pointer'
					>
						<div className='flex items-center gap-2'>
							{item.icon}
							<span>{item.title}</span>
						</div>
						<ChevronDown
							size={16}
							className={cn('transition-transform', open && 'rotate-180')}
						/>
					</Button>
				</CollapsibleTrigger>

				<CollapsibleContent className='ml-6 space-y-1'>
					{item.children.map((child: SidebarItemInterface, i: number): JSX.Element => {
						const active: boolean = pathname === child.href;

						return (
							<Link
								key={i}
								href={child.href || '#'}
							>
								<Button
									variant={active ? 'secondary' : 'ghost'}
									className='w-full justify-start gap-2 mt-2 cursor-pointer'
								>
									{child.icon}
									{child.title}
								</Button>
							</Link>
						);
					})}
				</CollapsibleContent>
			</Collapsible>
		);
	}

	// Nếu không có children → link thường
	const active: boolean = pathname === item.href;

	return (
		<Link href={item.href || '#'}>
			<Button
				variant={active ? 'secondary' : 'ghost'}
				className='w-full justify-start gap-2 cursor-pointer'
			>
				{item.icon}
				{item.title}
			</Button>
		</Link>
	);
}
