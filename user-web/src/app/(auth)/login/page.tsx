import { Metadata } from 'next';
import { LoginContainer } from './_components/login-container';
export const metadata: Metadata = {
	title: 'Login | My Awesome App',
	description: 'Đăng nhập vào hệ thống của chúng tôi',
};

export default function Page() {
	return <LoginContainer />;
}
