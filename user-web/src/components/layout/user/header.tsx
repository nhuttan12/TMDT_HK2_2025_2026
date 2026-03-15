'use client';

import { ListOrdered, LogOut, Search, ShoppingCart, User } from 'lucide-react';
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

const headerElements: RedirectElement[] = [
	{ key: 'home', label: 'Trang chủ', href: '/' },
	{ key: 'products', label: 'Sản phẩm', href: '/products' },
	{ key: 'men', label: 'Đồ nam', href: '/men' },
	{ key: 'women', label: 'Đồ nữ', href: '/women' },
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

export default function Header() {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<header className='sticky top-0 z-50 w-full border-b bg-white'>
			<div className='mx-auto flex h-16 max-w-7xl items-center px-4'>
				{/* Left */}
				<div className='flex items-center gap-6'>
					<Link
						href='/public'
						className='flex items-center gap-2'
					>
						<AcmeLogo />
						<span className='hidden text-xl sm:block font-bold'>ACME</span>
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
												'rounded-md px-3 py-2 text-base font-medium transition-colors',
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

					<div className='hidden lg:flex items-center gap-2'>
						<Button
							asChild
							variant='outline'
							className='bg-white text-black border-black hover:bg-gray-100'
						>
							<Link href='/auth/login'>Đăng nhập</Link>
						</Button>

						<Button
							asChild
							className='bg-black text-white! hover:bg-white hover:text-black!'
						>
							<Link href='/auth/register'>Đăng ký</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
