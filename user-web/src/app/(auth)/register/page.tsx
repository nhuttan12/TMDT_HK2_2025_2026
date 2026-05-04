import RegisterContainer from '@/app/(auth)/register/_component/register-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'register | My Awesome App',
	description: 'Đăng nhập vào hệ thống của chúng tôi',
};
export default function RegisterPage() {
	return <RegisterContainer />;
}
