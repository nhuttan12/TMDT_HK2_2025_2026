'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound(): JSX.Element {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
			<h1 className="text-7xl font-bold mb-4">404</h1>

			<p className="text-xl text-muted-foreground mb-2">
				Trang bạn tìm không tồn tại
			</p>

			<p className="text-muted-foreground/70 mb-8">
				Có thể link sai hoặc nội dung đã bị xoá.
			</p>

			<div className="flex gap-4">
				<Button asChild>
					<Link href="/">Về trang chủ</Link>
				</Button>

				<Button
					variant="outline"
					onClick={() => window.history.back()}
				>
					Quay lại
				</Button>
			</div>
		</div>
	);
}
