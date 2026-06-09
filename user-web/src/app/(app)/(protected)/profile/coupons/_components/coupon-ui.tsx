import { Card } from '@/components/ui/card';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { CirclePoundSterling, Percent } from 'lucide-react';
import { JSX } from 'react';

interface CouponsUiProps {
	coupons: UserCoupon[];
	isLoading: boolean;
}

export function CouponsUi({ coupons, isLoading }: CouponsUiProps): JSX.Element {
	const formatValidTime = (isoString: string): string => {
        const date = new Date(isoString);
        const time = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const day = date.toLocaleDateString('vi-VN');
        return `${time} ${day}`;
    };

    return (
        <div className='min-h-screen bg-slate-50 p-6'>
            <div className='max-w-4xl mx-auto space-y-6'>
                <div>
                    <h1 className='text-2xl font-bold text-slate-800'>
                        <strong>Mã giảm giá của bạn</strong>
                    </h1>
                    <p className='text-slate-500 text-sm'>Sử dụng trước khi hết hạn</p>
                </div>

                {isLoading ? (
                    <div className='py-10 text-center text-slate-500'>
                        Đang tải danh sách mã giảm giá...
                    </div>
                ) : coupons.length === 0 ? (
                    <div className='py-10 text-center text-slate-500'>
                        Bạn chưa có mã giảm giá nào.
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {coupons.map((coupon: UserCoupon): JSX.Element => (
                            <Card
                                key={coupon.id}
                                className='flex overflow-hidden rounded-2xl shadow-sm border border-slate-200'
                            >
                                {/* Left */}
                                <div className='w-32 bg-red-500 text-white flex flex-col items-center justify-center p-4 relative'>
                                    {coupon.discountType === 'percentage' ? (
                                        <Percent size={28} />
                                    ) : (
                                        <CirclePoundSterling size={28} />
                                    )}
                                    <div className='text-lg font-bold mt-2 text-center leading-tight'>
                                        {coupon.name}
                                    </div>
                                    <div className='absolute right-0 top-0 h-full w-2 bg-slate-50'>
                                        <div className='h-full border-r-2 border-dashed border-red-400'></div>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className='flex-1 p-4 flex flex-col justify-center'>
                                    <div>
                                        <p className='text-sm text-slate-500 mt-1'>
                                            HSD: {formatValidTime(coupon.validTime.toDate)}
                                        </p>
                                        <p className='text-xs text-slate-400 mt-1'>
                                            Đơn tối thiểu: {coupon.minOrderValue.toLocaleString('vi-VN')}đ
                                        </p>
                                        <p className='text-sm font-mono text-slate-600 mt-2 bg-slate-100 inline-block px-2 py-1 rounded'>
                                            Mã: {coupon.code}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
