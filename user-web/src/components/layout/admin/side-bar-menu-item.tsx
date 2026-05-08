import { cn } from '@/lib/utils';
import { SidebarItemInterface } from '@/types/uis/SidebarItemInterface';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX, useState } from 'react';

interface SidebarMenuItemProps {
	item: SidebarItemInterface;
}

export function SidebarMenuItem({ item }: SidebarMenuItemProps): JSX.Element {
	const pathname = usePathname();

	const checkIsActive = (href?: string) => {
		if (!href) return false;

		// Xử lý riêng cho Dashboard để tránh tình trạng menu nào nó cũng sáng
		if (href === '/admin') {
			return pathname === href;
		}

		// Tô màu nếu URL giống hệt, hoặc URL là một trang con (vd: /admin/products/123)
		return pathname === href || pathname.startsWith(`${href}/`);
	};

	// Kiểm tra xem có child nào đang được active không để tự động mở menu cha
	const isChildActive = item.children?.some((child) => checkIsActive(child.href));
	const [isOpen, setIsOpen] = useState<boolean>(isChildActive || false);

	const hasChildren = item.children && item.children.length > 0;
	const isActive = checkIsActive(item.href);

	if (hasChildren) {
		return (
			<div className='flex flex-col gap-1'>
				{/* NÚT BẤM MENU CHA */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className={cn(
						'flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm font-medium hover:bg-gray-100 hover:text-gray-900',
						isChildActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600',
					)}
				>
					<div className='flex items-center gap-3'>
						{item.icon}
						<span>{item.title}</span>
					</div>
					{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
				</button>

				{/* DANH SÁCH MENU CON (Xổ xuống) */}
				{isOpen && (
					<div className='flex flex-col gap-1 pl-7 pr-2 mt-1'>
						{item.children!.map((child, index) => {
							// Kiểm tra trạng thái Active cho từng thẻ con
							const isChildItemActive = checkIsActive(child.href);

							return (
								<Link
									key={index}
									href={child.href || '#'}
									className={cn(
										'flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium hover:bg-gray-100',
										isChildItemActive
											? 'text-blue-600 bg-blue-50'
											: 'text-gray-500',
									)}
								>
									{child.icon && <span>{child.icon}</span>}
									<span>{child.title}</span>
								</Link>
							);
						})}
					</div>
				)}
			</div>
		);
	}

	// MENU BÌNH THƯỜNG (Không có children)
	return (
		<Link
			href={item.href || '#'}
			className={cn(
				'flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium hover:bg-gray-100 hover:text-gray-900',
				isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600',
			)}
		>
			{item.icon}
			<span>{item.title}</span>
		</Link>
	);
}
