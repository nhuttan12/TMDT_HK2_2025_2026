import ChatBoxContainer from '@/components/chat/user/chat-box-container';
import { JSX } from 'react';
<<<<<<< HEAD
import Footer from '../../components/layout/user/footer';
import Header from '../../components/layout/user/header';
=======
import Footer from '@/components/layout/user/footer';
import ChatBox from '@/components/user/user/chatbox';
import { HeaderContainer } from '@/components/layout/user/header-container';
import AuthContainer from '@/app/(auth)/_component/auth-container';
>>>>>>> c4fc58810eb5e80223d2327f865b26697e10c107

export default function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<AuthContainer>
			<div className='min-h-screen flex flex-col bg-[#f2f4f7]'>
				<HeaderContainer />
				<main className='flex-1'>
					<div className='mx-auto max-w-275'>{children}</div>
					<ChatBox />
				</main>

<<<<<<< HEAD
			<main className='flex-1'>
				<div className='mx-auto max-w-300'>{children}</div>
				<ChatBoxContainer />
			</main>

			<Footer />
		</div>
=======
				<Footer />
			</div>
		</AuthContainer>
>>>>>>> c4fc58810eb5e80223d2327f865b26697e10c107
	);
}
