'use client';

import { JSX } from 'react';
import { useCouponsQuery } from '@/queries/coupons/user/use-coupons-query';
import { CouponsUi } from '@/app/(app)/profile/coupons/_components/coupon-ui';
import { Coupon } from '@/types/coupons/Coupon';

interface CouponsContainerProps {
	userId: number;
	initialCoupons: Coupon[];
}

export default function CouponsContainer(props: CouponsContainerProps): JSX.Element {
	const { userId, initialCoupons } = props;

	// Truyền userId và initialCoupons vào Query
	const { data: coupons = [], isLoading } = useCouponsQuery(userId, initialCoupons);

	return (
		<CouponsUi
			coupons={coupons}
			isLoading={isLoading}
		/>
	);
}
