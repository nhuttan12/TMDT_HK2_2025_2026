import ChatBoxContainer from '@/components/chat/user/chat-box-container';
import { JSX } from 'react';
import Footer from '../../components/layout/user/footer';
import Header from '../../components/layout/user/header';

export default function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className='min-h-screen flex flex-col bg-[#f2f4f7]'>
			<Header />

			<main className='flex-1'>
				<div className='mx-auto max-w-300'>{children}</div>
				<ChatBoxContainer />
			</main>

			<Footer />
		</div>
	);
}
