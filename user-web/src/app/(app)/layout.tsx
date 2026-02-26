import { JSX } from 'react';
import Footer from '../../components/layout/footer';
import Header from '../../components/layout/header';

export default function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className='min-h-screen flex flex-col bg-[#f2f4f7]'>
			<Header />

			<main className='flex-1'>
				<div className='mx-auto max-w-275'>{children}</div>
			</main>

			<Footer />
		</div>
	);
}
