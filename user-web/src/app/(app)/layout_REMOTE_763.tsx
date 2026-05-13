import { JSX } from 'react';
import Footer from '@/components/layout/user/footer';
import ChatBox from '@/components/user/user/chatbox';
import { HeaderContainer } from '@/components/layout/user/header-container';
import AuthContainer from '@/app/(auth)/_component/auth-container';

export default function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<AuthContainer>
			<div className='min-h-screen flex flex-col bg-[#f2f4f7]'>
				<HeaderContainer />
				<main className='flex-1'>
					<div className='mx-auto max-w-275'>{children}</div>
					<ChatBox />
				</main>

				<Footer />
			</div>
		</AuthContainer>
	);
}
