import './global.css';

export const metadata = {
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
