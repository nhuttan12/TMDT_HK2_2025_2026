import './global.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Welcome to user-web',
	description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			className='light'
		>
			<body>{children}</body>
		</html>
	);
}
