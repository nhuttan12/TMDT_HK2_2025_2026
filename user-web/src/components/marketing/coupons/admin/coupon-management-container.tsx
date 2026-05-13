'use client';

import React, { JSX } from 'react';
import { CouponScope } from '@/types/marketing/coupons/CouponScope';
import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { useCouponQuery } from '@/queries/marketing/coupons/admin/use-coupon-admin-query';
import { useCouponManagementLogic } from '@/hooks/marketing/coupons/admin/use-coupon-management-logic';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { CouponManagementUi } from './coupon-management-ui';
import { AppRole } from '@/types/uis/AppRole';

interface CouponManagementContainerProps {
	scope: CouponScope;
	role: AppRole;
	initialCoupons?: PaginationResponse<AdminCoupon>;
	shopId?: number;
}

export const CouponManagementContainer = ({
	scope,
	initialCoupons,
	shopId,
	role,
}: CouponManagementContainerProps): JSX.Element => {
	// 1. Lấy data từ tầng Service / Cache
	// (Sau này API thật sẽ trả về PaginatedResponse thay vì array)
	const { data: response, isLoading } = useCouponQuery(scope, shopId, initialCoupons);

	// 2. Khởi tạo Logic xử lý sự kiện (Inject data vào hook)
	const logic = useCouponManagementLogic({ apiResponse: response, role });

	// 3. Render Presenter (UI) bằng Spread Operator
	return (
		<CouponManagementUi
			isLoading={isLoading}
			{...logic}
		/>
	);
};
