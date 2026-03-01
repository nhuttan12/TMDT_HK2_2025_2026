'use client';

import { JSX, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}): JSX.Element {
	useEffect(() => {
		console.error('Next Global Error:', error);
	}, [error]);

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='text-center space-y-4'>
				<h2 className='text-xl font-bold'>Có lỗi xảy ra</h2>

				<Button
					variant={'outline'}
					onClick={() => reset()}
					className='px-4 py-2 bg-black text-white rounded'
				>
					Try again
				</Button>
			</div>
		</div>
	);
}
