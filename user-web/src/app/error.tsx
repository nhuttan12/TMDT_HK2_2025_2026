'use client';

import { JSX, useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }): JSX.Element {
	useEffect(() => {
		console.error('Next Global Error:', error);
	}, [error]);

	return (
		<html>
			<body>
				<h2>Có lỗi xảy ra!</h2>
				<button onClick={() => reset()}>Thử lại</button>
			</body>
		</html>
	);
}
