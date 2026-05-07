'use client';

import { ShopStatusBadge } from '@/app/admin/shops/list/_components/shop-status-badge';
import { Button } from '@/components/ui/button';
import { usePagination, UsePaginationReturn } from '@/hooks/share/use-pagination';
import { useShopAdminQuery } from '@/queries/shops/admin/use-shop-admin-query';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ShopAdmin } from '@/types/shops/admin/ShopAdmin';
import { Column } from '@/types/uis/Column';
import { useRouter, useSearchParams } from 'next/navigation';

interface UseShopAdminLogicProps {
	initialData: PaginationResponse<ShopAdmin>;
}

export interface ShopAdminTableLogicReturn {
	data?: PaginationResponse<ShopAdmin>;
	isLoading: boolean;
	columns: Column<ShopAdmin>[];
	pagination: UsePaginationReturn;
	handleRowClick: (row: ShopAdmin) => void;
	handleAddShop: () => void;
}

export function useShopAdminLogic({
	initialData,
}: UseShopAdminLogicProps): ShopAdminTableLogicReturn {
	const searchParams = useSearchParams();
	const router = useRouter();

	// Đọc params từ URL
	const pageParam = Number(searchParams.get('page')) || 1;
	const searchParam = searchParams.get('name') || '';
	const statusParam = searchParams.get('status') || '';

	// Gọi Query
	const { data, isLoading, isFetching } = useShopAdminQuery(
		pageParam,
		searchParam,
		statusParam,
		initialData,
	);

	// Tích hợp hook phân trang của bạn
	const pagination: UsePaginationReturn = usePagination(data?.meta.totalPages || 1);

	const handleRowClick = (shop: ShopAdmin) => {
		router.push(`/admin/shops/${shop.id}`);
	};

	const handleAddShop = () => {
		router.push('/admin/shops/create');
	};

	// Định nghĩa Columns cho DataTable
	const columns: Column<ShopAdmin>[] = [
		{
			key: 'id',
			header: 'ID',
			render: (row) => <span className='font-medium'>#{row.id}</span>,
		},
		{
			key: 'name',
			header: 'Tên Cửa Hàng',
			render: (row) => <span className='font-semibold'>{row.name}</span>,
		},
		{
			key: 'contact',
			header: 'Liên Hệ',
			render: (row) => (
				<div className='flex flex-col text-sm'>
					<span>{row.email}</span>
					<span className='text-gray-500'>{row.phone}</span>
				</div>
			),
		},
		{
			key: 'status',
			header: 'Trạng Thái',
			render: (row) => <ShopStatusBadge status={row.status} />,
		},
		{
			key: 'rating',
			header: 'Đánh Giá',
			render: (row) => <span>⭐ {row.rating}</span>,
		},
		{
			key: 'actions',
			header: 'Thao Tác',
			render: (row) => (
				<div className='flex gap-2'>
					{row.status !== 'banned' ? (
						<Button
							variant='link'
							className='text-red-600 hover:text-red-800 p-0 h-auto font-medium cursor-pointer'
							onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
								// Ngăn chặn sự kiện click lan ra thẻ <tr> bên ngoài (tránh gọi onRowClick)
								e.stopPropagation();

								// Gọi hàm xử lý cấm cửa hàng tại đây
								// handleBanShop(row.id);
								console.log('Tiến hành cấm cửa hàng ID:', row.id);
							}}
						>
							Cấm cửa hàng
						</Button>
					) : (
						<Button
							variant='link'
							className='text-red-600 hover:text-red-800 p-0 h-auto font-medium cursor-pointer'
							onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
								// Ngăn chặn sự kiện click lan ra thẻ <tr> bên ngoài (tránh gọi onRowClick)
								e.stopPropagation();

								// Gọi hàm xử lý cấm cửa hàng tại đây
								// handleBanShop(row.id);
								console.log('Tiến hành cấm cửa hàng ID:', row.id);
							}}
						>
							Mở khoá cửa hàng
						</Button>
					)}
				</div>
			),
		},
	];

	return {
		data,
		isLoading: isLoading || isFetching,
		columns,
		pagination,
		handleRowClick,
		handleAddShop,
	};
}
