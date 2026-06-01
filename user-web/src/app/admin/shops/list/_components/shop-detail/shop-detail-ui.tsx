'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShopAdminDetail } from '@/types/shops/admin/ShopAdminDetail';
import { ArrowLeft, ShieldAlert, ShieldCheck } from 'lucide-react';
import { JSX } from 'react';
import { ShopStatusBadge } from '../shop-status-badge';

interface ShopDetailUiProps {
	shop?: ShopAdminDetail;
	isLoading: boolean;
	onBack: () => void;
	onBan: () => void;
	onUnban: () => void;
}

export function ShopDetailUi({
	shop,
	isLoading,
	onBack,
	onBan,
	onUnban,
}: ShopDetailUiProps): JSX.Element {
	if (isLoading || !shop) {
		return <div className='p-8 text-center text-gray-500'>Đang tải thông tin...</div>;
	}

	return (
		<div className='p-6 space-y-6 max-w-5xl mx-auto'>
			{/* HEADER TRANG */}
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-4'>
					<Button
						variant='outline'
						size='icon'
						onClick={onBack}
						className='cursor-pointer'
					>
						<ArrowLeft size={18} />
					</Button>
					<div>
						<h1 className='text-2xl font-bold'>Chi tiết cửa hàng: {shop.name}</h1>
						<p className='text-sm text-gray-500'>
							ID: #{shop.id} | Ngày tham gia:{' '}
							{new Date(shop.createdAt).toLocaleDateString('vi-VN')}
						</p>
					</div>
				</div>

				<div className='flex items-center gap-3'>
					<ShopStatusBadge status={shop.status} />

					{shop.status === 'banned' ? (
						<Button
							onClick={onUnban}
							className='bg-green-600 hover:bg-green-700 cursor-pointer'
						>
							<ShieldCheck
								size={16}
								className='mr-2'
							/>{' '}
							Mở khóa Shop
						</Button>
					) : (
						<Button
							onClick={onBan}
							variant='destructive'
							className='cursor-pointer'
						>
							<ShieldAlert
								size={16}
								className='mr-2'
							/>{' '}
							Cấm Shop
						</Button>
					)}
				</div>
			</div>

			{/* GRID THÔNG TIN */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{/* CỘT TRÁI: THÔNG TIN CHUNG */}
				<div className='md:col-span-2 space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Thông tin cơ bản</CardTitle>
						</CardHeader>
						<CardContent className='grid grid-cols-2 gap-4'>
							<div className='space-y-1'>
								<p className='text-sm text-gray-500'>Tên cửa hàng</p>
								<p className='font-medium'>{shop.name}</p>
							</div>
							<div className='space-y-1'>
								<p className='text-sm text-gray-500'>Email liên hệ</p>
								<p className='font-medium'>{shop.email}</p>
							</div>
							<div className='space-y-1'>
								<p className='text-sm text-gray-500'>Số điện thoại</p>
								<p className='font-medium'>{shop.phone}</p>
							</div>
							<div className='space-y-1'>
								<p className='text-sm text-gray-500'>Địa chỉ</p>
								<p className='font-medium'>{shop.address}</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>
								Thông tin Thanh toán & Ngân hàng
							</CardTitle>
						</CardHeader>
						<CardContent className='grid grid-cols-3 gap-4'>
							<div className='space-y-1'>
								<p className='text-sm text-gray-500'>Ngân hàng</p>
								<p className='font-medium'>{shop.bankName}</p>
							</div>
							<div className='space-y-1'>
								<p className='text-sm text-gray-500'>Chủ tài khoản</p>
								<p className='font-medium'>{shop.accountName}</p>
							</div>
							<div className='space-y-1'>
								<p className='text-sm text-gray-500'>Số tài khoản</p>
								<p className='font-medium'>{shop.accountNumber}</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* CỘT PHẢI: CHỈ SỐ VÀ HÌNH ẢNH */}
				<div className='space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Chỉ số vận hành</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='flex justify-between items-center border-b pb-2'>
								<span className='text-gray-500'>Đánh giá</span>
								<span className='font-bold text-yellow-500'>
									⭐ {shop.rating}/5.0
								</span>
							</div>
							<div className='flex justify-between items-center border-b pb-2'>
								<span className='text-gray-500'>Tổng sản phẩm</span>
								<span className='font-medium'>{shop.totalProducts}</span>
							</div>
							<div className='flex justify-between items-center border-b pb-2'>
								<span className='text-gray-500'>Đơn hàng thành công</span>
								<span className='font-medium'>{shop.totalOrders}</span>
							</div>
							<div className='flex justify-between items-center text-red-600'>
								<span>Số lần bị Report</span>
								<span className='font-bold'>{shop.reportedCount}</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className='text-lg'>Logo cửa hàng</CardTitle>
						</CardHeader>
						<CardContent className='flex justify-center'>
							{shop.logoUrl ? (
								<img
									src={shop.logoUrl}
									alt='Logo'
									className='w-32 h-32 object-contain rounded border'
								/>
							) : (
								<div className='w-32 h-32 bg-gray-100 flex items-center justify-center text-sm text-gray-400 rounded'>
									No Logo
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
