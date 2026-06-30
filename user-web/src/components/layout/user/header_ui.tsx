'use client';

import { ListOrdered, LogOut, Search, ShoppingCart, Sprout, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { JSX, ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

/* ---------- Logo ---------- */

export const AcmeLogo = () => (
	<svg
		fill='none'
		height='36'
		viewBox='0 0 32 32'
		width='36'
		className='text-black'
	>
		<path
			clipRule='evenodd'
			fill='currentColor'
			fillRule='evenodd'
			d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
		/>
	</svg>
);

/* ---------- Types ---------- */

interface RedirectElement {
	key: string;
	label: string;
	href: string;
	icon?: ReactNode;
}

/* ---------- Data ---------- */
export const headerElements: RedirectElement[] = [
	{
		key: 'products',
		label: 'Sản phẩm',
		href: '/products',
	},
	{
		key: 'terrariums',
		label: 'Bể kính tiểu cảnh',
		href: '/terrariums',
	},
	{
		key: 'plants-moss',
		label: 'Cây & Rêu',
		href: '/plants-moss',
	},
	{
		key: 'accessories',
		label: 'Phụ kiện & Đất nền',
		href: '/accessories',
	},
	{
		key: 'diy-kits',
		label: 'Bộ tự làm (DIY)',
		href: '/diy-kits',
	},
];

const profileElements: RedirectElement[] = [
	{
		key: 'profile',
		label: 'Hồ sơ người dùng',
		href: '/profile',
		icon: <User className='h-4 w-4' />,
	},
	{
		key: 'orders',
		label: 'Đơn mua',
		href: '/profile/invoices',
		icon: <ListOrdered className='h-4 w-4' />,
	},
	{
		key: 'cart',
		label: 'Giỏ hàng',
		href: '/carts',
		icon: <ShoppingCart className='h-4 w-4' />,
	},
	{
		key: 'logout',
		label: 'Đăng xuất',
		href: '/logout',
		icon: <LogOut className='h-4 w-4' />,
	},
];

/* ---------- Component ---------- */

interface HeaderProps {
	isAuthenticated: boolean;
}

export default function HeaderUi({ isAuthenticated }: HeaderProps) {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-white'>
			<div className='mx-auto flex flex-col h-full max-w-7xl px-4 py-4 gap-2'>
				<Link href={'/shop-registration'}>
					<span className='pl-3 text-sm'>Đăng ký bán hàng</span>
				</Link>
				<div className='mx-auto flex h-full w-full items-center'>
					{/* Left */}
					<div className='flex items-center gap-6'>
						<Link
							href='/'
							aria-label='Home'
							className='flex items-center gap-2'
						>
							{/* Khối Logo Icon */}
							<div className='flex items-center justify-center w-8 h-8 transition-colors rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200'>
								<Sprout
									className='w-5 h-5'
									strokeWidth={2.5}
								/>
							</div>

							{/* Khối Text Thương hiệu */}
							<span className='hidden text-xl font-extrabold tracking-tight transition-colors text-slate-800 sm:block group-hover:text-emerald-700'>
								TerraCraft
							</span>
						</Link>

						<NavigationMenu className='hidden sm:flex'>
							<NavigationMenuList className='gap-3'>
								{headerElements.map((item) => {
									const isActive = pathname === item.href;

									return (
										<NavigationMenuItem key={item.key}>
											<NavigationMenuLink
												asChild
												className={cn(
													'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
													isActive
														? 'bg-slate-100 text-black'
														: 'text-slate-600 hover:text-black',
												)}
											>
												<Link href={item.href}>{item.label}</Link>
											</NavigationMenuLink>
										</NavigationMenuItem>
									);
								})}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					{/* Right */}
					<div className='ml-auto flex items-center gap-3'>
						<div className='hidden sm:block'>
							<InputGroup className='max-w-xs'>
								<InputGroupInput placeholder='Search...' />
								<InputGroupAddon>
									<Search />
								</InputGroupAddon>
							</InputGroup>
						</div>

						{isAuthenticated ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className='rounded-full focus:outline-none focus:ring-2 focus:ring-black/40 cursor-pointer'>
										<Avatar className='h-8 w-8'>
											<AvatarImage src='https://i.pravatar.cc/150?u=a042581f4e29026704d' />
											<AvatarFallback>U</AvatarFallback>
										</Avatar>
									</button>
								</DropdownMenuTrigger>

								<DropdownMenuContent
									align='end'
									className='w-48'
								>
									{profileElements.map(
										(item: RedirectElement): JSX.Element => (
											<Link
												href={item.href}
												key={item.key}
											>
												<DropdownMenuItem
													key={item.key}
													onClick={() => router.push(item.href)}
													className='flex items-center justify-between cursor-pointer'
												>
													{item.label}
													{item.icon}
												</DropdownMenuItem>
											</Link>
										),
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<div className='hidden lg:flex items-center gap-2'>
								<Button
									asChild
									variant='outline'
									className='bg-white text-black border-black hover:bg-gray-100'
								>
									<Link href='/login'>Đăng nhập</Link>
								</Button>

								<Button
									asChild
									className='bg-black text-white! hover:bg-white hover:text-black!'
								>
									<Link href='/register'>Đăng ký</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
