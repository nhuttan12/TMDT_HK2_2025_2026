'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Footer(): JSX.Element {
	return (
		<footer className='mt-16 border-t border-slate-200 bg-white'>
			<div className='mx-auto max-w-[1700px] px-4 py-10'>
				<div className='grid grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:text-left'>
					{/* Column 1 */}
					<div>
						<p className='text-sm text-slate-500'>
							Nền tảng mua sắm trái cây tươi, giao nhanh trong ngày.
						</p>
					</div>

					{/* Column 2 */}
					<div>
						<h4 className='mb-3 font-medium'>Liên kết</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									href='/products'
									className='text-slate-600 hover:text-black transition-colors'
								>
									Sản phẩm
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									className='text-slate-600 hover:text-black transition-colors'
								>
									Liên hệ
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 3 */}
					<div>
						<h4 className='mb-3 font-medium'>Hỗ trợ</h4>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									href='/privacy'
									className='text-slate-600 hover:text-black transition-colors'
								>
									Chính sách bảo mật
								</Link>
							</li>
							<li>
								<Link
									href='/terms'
									className='text-slate-600 hover:text-black transition-colors'
								>
									Điều khoản sử dụng
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<Separator className='my-6' />

				<div className='flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:justify-between'>
					<p className='text-xs text-slate-500'>
						© {new Date().getFullYear()} User Web. All rights reserved.
					</p>
					<p className='text-xs text-slate-400'>Built with Next.js & shadcn/ui</p>
				</div>
			</div>
		</footer>
	);
}
