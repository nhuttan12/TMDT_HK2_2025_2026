import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { JSX } from 'react';

interface CouponListProps {
	coupons: UserCoupon[];
	onClaimClick: (couponId: string) => void;
	label: string;
}

export const CouponList = ({ coupons, onClaimClick, label }: CouponListProps) => {
	return (
		<section className='bg-white p-6 rounded-xl shadow-sm'>
			<h2 className='text-lg font-bold mb-4'>{label}</h2>
			<div className='flex gap-4 overflow-x-auto pb-2'>
				{coupons.map(
					(coupon: UserCoupon): JSX.Element => (
						<div
							key={coupon.id}
							className='min-w-70 border border-orange-200 bg-orange-50 rounded-lg p-4 flex flex-col gap-2'
						>
							<div className='flex justify-between items-start'>
								<div>
									<Badge
										variant={
											coupon.couponType === 'sale' ? 'destructive' : 'default'
										}
									>
										{coupon.couponType}
									</Badge>
									<h3 className='font-bold text-orange-700 mt-2'>
										{coupon.title}
									</h3>
								</div>
							</div>
							<p className='text-xs text-gray-600 line-clamp-2'>
								{coupon.description}
							</p>
							<div className='mt-2 flex justify-between items-center'>
								<span className='text-xs text-gray-500'>
									HSD: {new Date(coupon.expiredAt).toLocaleDateString('vi-VN')}
								</span>
								<Button
									size='sm'
									onClick={(): void => onClaimClick(coupon.code)}
								>
									Lưu mã
								</Button>
							</div>
						</div>
					),
				)}
			</div>
		</section>
	);
};
