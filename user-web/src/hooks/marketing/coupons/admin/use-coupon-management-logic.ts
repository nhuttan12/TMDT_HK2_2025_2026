// use-voucher-management-logic.ts
import { usePagination, UsePaginationReturn } from '@/hooks/share/use-pagination';
import { useQueryFilter } from '@/hooks/share/use-query-filter';
import { useTableSort, UseTableSortReturn } from '@/hooks/share/use-table-sort';
import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { CouponFilterParams } from '@/types/marketing/coupons/admin/CouponFilterParams';
import { CouponSortField } from '@/types/marketing/coupons/admin/CouponSortField';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { AppRole } from '@/types/uis/AppRole';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export interface CouponManagementLogicReturn {
	coupons: AdminCoupon[];
	searchTerm: string;
	onSearchChange: (value: string) => void;
	onDeleteCoupon: (id: string) => void;
	onEditCoupon: (id: string) => void;
	onViewCoupon: (id: string) => void;
	onAddCoupon: () => void;
	pagination: UsePaginationReturn & { totalPages: number };
	sortConfig: UseTableSortReturn<CouponSortField>;
	filterConfig: {
		initialFilters: Partial<CouponFilterParams>;
		onApplyFilter: (filters: Partial<CouponFilterParams>) => void;
	};
}

interface UseCouponManagementLogicProps {
	apiResponse: PaginationResponse<AdminCoupon> | undefined;
	role: AppRole;
}

export const useCouponManagementLogic = ({
	apiResponse,
	role,
}: UseCouponManagementLogicProps): CouponManagementLogicReturn => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchTerm, setSearchTerm] = useState<string>('');

	const totalPages: number = apiResponse?.meta.totalPages || 1;

	const route = role == 'admin' ? 'admin' : role == 'shop-owner' ? 'shop-owner' : '';

	const sortConfig = useTableSort<CouponSortField>();
	const { applyFilters } = useQueryFilter<CouponFilterParams & { search?: string }>();
	const pagination = usePagination(totalPages); // Truyền totalPages vào hook

	const initialFilters: Partial<CouponFilterParams> = useMemo((): Partial<CouponFilterParams> => {
		return {
			search: searchParams.get('search') || undefined,

			// Ép kiểu về các Type/Enum tương ứng
			status: (searchParams.get('status') as CouponFilterParams['status']) || undefined,
			scope: (searchParams.get('scope') as CouponFilterParams['scope']) || undefined,
			discountType:
				(searchParams.get('discountType') as CouponFilterParams['discountType']) ||
				undefined,

			fromDate: searchParams.get('fromDate') || undefined,
			toDate: searchParams.get('toDate') || undefined,
		};
	}, [searchParams]);

	// Đẩy search text lên URL thay vì filter ở Client
	const handleSearchChange = (value: string): void => {
		setSearchTerm(value);
		applyFilters({ search: value || undefined });
	};

	const handleDeleteCoupon = (couponId: string): void => {
		console.log(`Tiến hành xóa coupon id: ${couponId}`);
	};

	const handleEditCoupon = (couponId: string): void => {
		router.push(`/${route}}/marketing/coupons/${couponId}/edit`);
	};

	const handleViewCoupon = (couponId: string): void => {
		router.push(`/${route}/marketing/coupons/${couponId}`);
	};

	const handleAddCoupon = (): void => {
		router.push(`/${route}/marketing/coupons/add-new`);
	};

	const handleApplyFilter = (filters: Partial<CouponFilterParams>): void => {
		const cleanedFilters = { ...filters };
		Object.keys(cleanedFilters).forEach((key): void => {
			const fieldKey = key as keyof CouponFilterParams;
			if (cleanedFilters[fieldKey] === 'ALL') {
				cleanedFilters[fieldKey] = undefined;
			}
		});
		applyFilters(cleanedFilters);
	};

	return {
		coupons: apiResponse?.data || [], // Data trả thẳng ra UI
		searchTerm,
		onSearchChange: handleSearchChange,
		onDeleteCoupon: handleDeleteCoupon,
		onEditCoupon: handleEditCoupon,
		onViewCoupon: handleViewCoupon,
		onAddCoupon: handleAddCoupon,
		pagination: {
			...pagination,
			totalPages, // Trả ra UI để vẽ thanh trang
		},
		sortConfig,
		filterConfig: {
			initialFilters,
			onApplyFilter: handleApplyFilter,
		},
	};
};
