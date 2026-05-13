import { Metadata } from 'next';
import { LogoutContainer } from '@/app/(auth)/logout/_component/logout-container';
export const metadata: Metadata = {
	title: 'Login | My Awesome App',
	description: 'Đăng nhập vào hệ thống của chúng tôi',
};

export default function Page() {
	return <LogoutContainer />;
}
