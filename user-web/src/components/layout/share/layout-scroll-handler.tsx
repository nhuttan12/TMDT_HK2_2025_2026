'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface LayoutScrollHandlerProps {
	noScrollPaths: string[];
}

export default function LayoutScrollHandler({ noScrollPaths }: LayoutScrollHandlerProps): null {
	const pathname: string = usePathname();

	useEffect((): void => {
		// Kiểm tra xem trang hiện tại có nằm trong danh sách cần ẩn scroll không
		const shouldHideScroll: boolean = noScrollPaths.some((path: string): boolean =>
			pathname.includes(path),
		);

		if (shouldHideScroll) {
			document.documentElement.classList.add('no-scrollbar', 'overflow-hidden');
		} else {
			document.documentElement.classList.remove('no-scrollbar', 'overflow-hidden');
		}
	}, [pathname, noScrollPaths]);

	return null; // Component này không render UI, chỉ xử lý logic side-effect
}
