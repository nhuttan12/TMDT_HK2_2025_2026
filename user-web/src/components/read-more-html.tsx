'use client';

import { JSX, RefObject, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ReadMoreProps {
	html: string;
	maxLines?: number;
}

export default function ReadMoreHtml({ html, maxLines = 3 }: ReadMoreProps): JSX.Element {
	const [expanded, setExpanded] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const contentRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
	const shouldShowButton: boolean = isOverflowing || expanded;

	const clampClass: string =
		{
			1: 'line-clamp-1',
			2: 'line-clamp-2',
			3: 'line-clamp-3',
			4: 'line-clamp-4',
			5: 'line-clamp-5',
			6: 'line-clamp-6',
			10: 'line-clamp-10',
		}[maxLines] ?? 'line-clamp-3';

	useEffect((): void => {
		const el: HTMLDivElement | null = contentRef.current;
		if (!el) return;

		const checkOverFlow = () => {
			setIsOverflowing(el.scrollHeight > el.clientHeight);
		};

		requestAnimationFrame(checkOverFlow);
	}, [html, expanded]);

	return (
		<div>
			<div
				ref={contentRef}
				className={`prose max-w-none transition-all ${expanded ? '' : clampClass}`}
				dangerouslySetInnerHTML={{ __html: html }}
			/>

			{shouldShowButton && (
				<div className='flex justify-center mt-2'>
					<div className='rounded-full border! border-orange-500!'>
						<Button
							variant='outline'
							size='lg'
							className='w-full rounded-full border-0 text-sm font-mediu text-orange-600 cursor-pointer hover:bg-orange-500 hover:text-white'
							onClick={() => setExpanded(!expanded)}
						>
							{expanded ? 'Thu gọn' : 'Xem thêm'}
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
