'use client';

import React, { JSX } from 'react';
import { CouponFormUi } from '../admin/coupon-form-ui';
import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { useCouponFormLogic } from '@/hooks/marketing/coupons/admin/use-coupon-form-logic';
import { useCouponDetailByCouponIdQuery } from '@/queries/marketing/coupons/admin/use-coupon-detail-by-coupon-id-query';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

interface CouponFormContainerProps {
	couponId?: string;
	initialCoupon: AdminCoupon;
	mode: AdminFormType;
}

export const CouponFormContainer = ({
	couponId,
	initialCoupon,
    mode,
}: CouponFormContainerProps): JSX.Element => {
	// 1. Quản lý Cache và Data Fetching (Có sẵn initialData từ Server)
	const { data: coupon, isLoading } = useCouponDetailByCouponIdQuery(couponId, initialCoupon);

	// 2. Khởi tạo Logic Form
	// Luôn ưu tiên data từ query (nếu có update), fallback về initialCoupon
	const logic = useCouponFormLogic(mode, coupon || initialCoupon);

	// 3. Render Presenter
	return <CouponFormUi {...logic} />;
};
