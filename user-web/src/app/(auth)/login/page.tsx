// app/(auth)/login/page.tsx
import { Metadata } from 'next';
import { LoginContainer } from '@/app/(auth)/login/_components/login_container';
export const metadata: Metadata = {
	title: 'Login | My Awesome App',
	description: 'Đăng nhập vào hệ thống của chúng tôi',
};

export default function Page() {
	return <LoginContainer />;
}
