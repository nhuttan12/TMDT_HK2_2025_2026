import { cn } from "@/lib/utils";
import { SidebarItemInterface } from "@/types/uis/SidebarItemInterface";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useState } from "react";

interface SidebarMenuItemProps {
	item: SidebarItemInterface;
}

export function SidebarMenuItem({item}: SidebarMenuItemProps): JSX.Element {
	const pathname = usePathname();

	// Kiểm tra xem có child nào đang được active không để tự động mở menu cha
	const isChildActive = item.children?.some((child) => child.href === pathname);
	const [isOpen, setIsOpen] = useState<boolean>(isChildActive || false);

	const hasChildren = item.children && item.children.length > 0;
	const isActive = pathname === item.href;

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
						{item.children!.map((child, index) => (
							<Link
								key={index}
								href={child.href || '#'}
								className={cn(
									'flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium hover:bg-gray-100',
									pathname === child.href
										? 'text-blue-600 bg-blue-50'
										: 'text-gray-500',
								)}
							>
								{child.icon && <span>{child.icon}</span>}
								<span>{child.title}</span>
							</Link>
						))}
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
