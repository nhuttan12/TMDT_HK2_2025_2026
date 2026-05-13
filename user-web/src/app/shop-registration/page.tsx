import { JSX } from 'react';
import { Metadata } from 'next';
import ShopRegistrationContainer from '@/components/shops/shop-registration-container';

export const metadata: Metadata = {
	title: 'Đăng ký mở cửa hàng',
	description:
		'Bắt đầu hành trình kinh doanh của bạn bằng cách đăng ký cửa hàng trên hệ thống của chúng tôi.',
};

export default function ShopRegistrationPage(): JSX.Element {
	return <ShopRegistrationContainer role='customer'/>;
}
