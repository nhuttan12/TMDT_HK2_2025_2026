'use client';

import { JSX } from 'react';
import { useCouponUserQuery } from '@/queries/marketing/coupons/user/use-coupon-user-query';
import { CouponsUi } from '@/app/(app)/profile/coupons/_components/coupon-ui';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';

interface CouponsContainerProps {
	userId: number;
	initialCoupons: UserCoupon[];
}

export default function CouponsContainer(props: CouponsContainerProps): JSX.Element {
	const { userId, initialCoupons } = props;

	// Truyền userId và initialCoupons vào Query
	const { data: coupons = [], isLoading } = useCouponUserQuery(userId, initialCoupons);

	return (
		<CouponsUi
			coupons={coupons}
			isLoading={isLoading}
		/>
	);
}
