import './global.css';
import { Metadata } from 'next';
import { QueryProvider } from '@/components/layout/providers/query-provider';
import LayoutScrollHandler from '@/components/layout/share/layout-scroll-handler';

export const metadata: Metadata = {
	title: 'Terrarium - Rừng cây trong bể kính',
	description: 'Sàn thương mại buôn bán Terrarium',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const NO_SCROLL_PAGES: string[] = ['/admin/products'];

	return (
		<html
			lang='en'
			className='light'
		>
			<body suppressHydrationWarning={true}>
				<LayoutScrollHandler noScrollPaths={NO_SCROLL_PAGES} />

				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
