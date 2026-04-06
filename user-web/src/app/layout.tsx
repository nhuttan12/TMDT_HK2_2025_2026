import './global.css';
import { Metadata } from 'next';
import { QueryProvider } from '@/components/layout/providers/query-provider';

export const metadata: Metadata = {
	title: 'Terrarium - Rừng cây trong bể kính',
	description: 'Sàn thương mại buôn bán Terrarium',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			className='light'
		>
			<body>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
