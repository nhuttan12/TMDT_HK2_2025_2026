import { JSX } from 'react';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';

export default function AppLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className='min-h-screen flex flex-col'>
			<Header />

			<main className='flex-1'>
				<div className='mx-auto max-w-[1100px] px-4'>{children}</div>
			</main>

			<Footer />
		</div>
	);
}
