'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSX, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function QueryProvider({ children }: { children: React.ReactNode }): JSX.Element {
	const [queryClient] = useState(
		(): QueryClient =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 5 * 60 * 1000,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			 <ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}