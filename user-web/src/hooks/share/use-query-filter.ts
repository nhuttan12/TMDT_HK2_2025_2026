import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useQueryFilter<T extends object>() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const search = searchParams.toString();

	const applyFilters = useCallback(
		(filters: Partial<T>) => {
			const params = new URLSearchParams(search);

			Object.entries(filters).forEach(([key, value]) => {
				if (typeof value === 'boolean') {
					params.set(key, value ? 'true' : 'false');
				} else if (typeof value === 'number') {
					params.set(key, value.toString());
				} else if (value !== undefined && value !== null && value !== '') {
					params.set(key, String(value));
				} else {
					params.delete(key);
				}
			});

			router.push(`?${params.toString()}`);
		},
		[router, search],
	);

	return { applyFilters };
}
