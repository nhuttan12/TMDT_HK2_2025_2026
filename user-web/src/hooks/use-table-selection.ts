import { useCallback, useMemo, useState } from 'react';

export function useTableSelection<T>(
	allKeys: T[],
) {
	const [selected, setSelected] = useState<T[]>([]);

	// toggle 1 row
	const toggle = useCallback((key: T): void => {
		setSelected((prev: T[]): T[] =>
			prev.includes(key)
				? prev.filter((k): boolean => k !== key)
				: [...prev, key],
		);
	}, []);

	// toggle all
	const toggleAll = useCallback((): void => {
		setSelected((prev: T[]): T[] =>
			prev.length === allKeys.length ? [] : allKeys,
		);
	}, [allKeys]);

	// check selected
	const isSelected = useCallback(
		(key: T): boolean => selected.includes(key),
		[selected],
	);

	// trạng thái select all
	const isAllSelected: boolean = useMemo(
		(): boolean => selected.length === allKeys.length && allKeys.length > 0,
		[selected, allKeys],
	);

	const isIndeterminate: boolean = useMemo(
		(): boolean =>
			selected.length > 0 &&
			selected.length < allKeys.length,
		[selected, allKeys],
	);

	const reset = useCallback((): void => setSelected([]), []);

	return {
		selected,
		toggle,
		toggleAll,
		isSelected,
		isAllSelected,
		isIndeterminate,
		reset,
		setSelected, // optional nếu cần control ngoài
	};
}