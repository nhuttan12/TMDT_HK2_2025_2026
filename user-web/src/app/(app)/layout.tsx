import { JSX } from 'react';
import Footer from '../../components/layout/user/footer';
import Header from '../../components/layout/user/header';
import ChatBox from '@/components/user/user/chatbox';
import { AuthGuardContainer } from '@/components/auth/auth-guard-container';

export default function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className='min-h-screen flex flex-col bg-[#f2f4f7]'>
			<Header />
			<AuthGuardContainer>
				<main className='flex-1'>
					<div className='mx-auto max-w-275'>{children}</div>
					<ChatBox />
				</main>
			</AuthGuardContainer>

			<Footer />
		</div>
	);
}
