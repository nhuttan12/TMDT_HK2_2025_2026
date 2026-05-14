'use client';

import { ShopApprovalStatusBadge } from '@/app/admin/shops/approvals/_components/shop-approval-status-badge';
import { usePagination, UsePaginationReturn } from '@/hooks/share/use-pagination';
import { useShopApprovalQuery } from '@/queries/shops/admin/use-shop-approval-query';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ShopApproval } from '@/types/shops/admin/ShopApproval';
import { Column } from '@/types/uis/Column';
import { FilterField } from '@/types/uis/FilterField';
import { ApprovalShopsStatusLabel } from '@/utils/shop/approval-shops-status-label';
import { useRouter, useSearchParams } from 'next/navigation';

export interface ShopApprovalLogicReturn {
	columns: Column<ShopApproval>[];
	filterFields: FilterField<ShopApproval>[];
	pagination: UsePaginationReturn;
	handleRowClick: (row: ShopApproval) => void;
}

interface UseShopApprovalLogicProps {
	totalPages: number;
}

export function useShopApprovalLogic({
	totalPages,
}: UseShopApprovalLogicProps): ShopApprovalLogicReturn {
	const router = useRouter();

	const pagination = usePagination(totalPages);

	const handleRowClick = (shop: ShopApproval) => {
		// Nhấn vào dòng sẽ chuyển sang trang chi tiết để duyệt đơn
		router.push(`/admin/shops/approvals/${shop.id}`);
	};

	// 1. Cấu hình mảng Columns (KHÔNG CÓ CỘT ACTIONS)
	const columns: Column<ShopApproval>[] = [
		{
			key: 'id',
			header: 'Mã đơn',
			render: (row) => <span className='font-medium text-gray-600'>#{row.id}</span>,
		},
		{
			key: 'name',
			header: 'Tên Cửa Hàng',
			render: (row) => <span className='font-semibold text-blue-600'>{row.name}</span>,
		},
		{
			key: 'email',
			header: 'Email Liên Hệ',
		},
		{
			key: 'phone',
			header: 'Số Điện Thoại',
		},
		{
			key: 'createdAt',
			header: 'Ngày Đăng Ký',
			render: (row) => <span>{new Date(row.createdAt).toLocaleDateString('vi-VN')}</span>,
		},
		{
			key: 'status',
			header: 'Trạng Thái',
			render: (row) => <ShopApprovalStatusBadge status={row.status} />,
		},
	];

	// 2. Cấu hình Filter Field (Dùng status kebab-case)
	const filterFields: FilterField<ShopApproval>[] = [
		{
			key: 'status',
			label: 'Trạng thái',
			type: 'select',
			options: [
				{ label: 'Tất cả', value: 'ALL' },
				// Tận dụng luôn Label từ file TS để đồng bộ 100% chữ "Chờ duyệt", "Từ chối"
				{ label: ApprovalShopsStatusLabel['pending-approval'], value: 'pending-approval' },
				{ label: ApprovalShopsStatusLabel['approved'], value: 'approved' },
				{ label: ApprovalShopsStatusLabel['rejected'], value: 'rejected' },
			],
		},
	];
    
	return {
		columns,
		filterFields,
		pagination,
		handleRowClick,
	};
}
