import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { getCouponScopeLabel } from '@/utils/marketings/coupons/coupon-scope-label-mapping';
import { JSX } from 'react';

interface CouponListUiProps {
	coupons: UserCoupon[];
	onClaimClick: (couponId: string) => void;
	label: string;
}

export const CouponListUi = ({ coupons, onClaimClick, label }: CouponListUiProps) => {
	const formatEndTime = (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleDateString('vi-VN');
    };
    
    return (
        <section className='bg-white p-6 rounded-xl shadow-sm'>
            <h2 className='text-lg font-bold mb-4'>{label}</h2>
            <div className='flex gap-4 overflow-x-auto pb-2'>
                {coupons.map((coupon: UserCoupon): JSX.Element => {
                    // Tận dụng Discriminated Union: Đổi style tùy thuộc vào mã của Sàn hay Shop
                    const isPlatform = coupon.scope === 'platform';
                    const containerStyle = isPlatform
                        ? 'border-orange-200 bg-orange-50'
                        : 'border-blue-200 bg-blue-50';
                    const titleStyle = isPlatform ? 'text-orange-700' : 'text-blue-700';

                    return (
                        <div
                            key={coupon.id}
                            className={`min-w-70 border rounded-lg p-4 flex flex-col gap-2 ${containerStyle}`}
                        >
                            <div className='flex justify-between items-start'>
                                <div>
                                    <Badge variant={isPlatform ? 'destructive' : 'default'}>
                                        {getCouponScopeLabel(coupon.scope)}
                                    </Badge>
                                    <h3 className={`font-bold mt-2 ${titleStyle}`}>
                                        {coupon.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {coupon.category === 'shipping' ? 'Vận chuyển' : 'Giảm giá'}
                                    </p>
                                </div>
                            </div>
                            <div className='mt-2 flex justify-between items-center'>
                                <span className='text-xs text-gray-500'>
                                    Hết hạn: {formatEndTime(coupon.validTime.toDate)}
                                </span>
                                <Button
                                    size='sm'
                                    disabled={coupon.userSavedStatus === 'saved' || coupon.userSavedStatus === 'used_up'}
                                    onClick={(): void => onClaimClick(coupon.id)}
                                >
                                    {coupon.userSavedStatus === 'saved' 
                                        ? 'Đã lưu' 
                                        : coupon.userSavedStatus === 'used_up' 
                                            ? 'Hết lượt' 
                                            : 'Lưu mã'}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
