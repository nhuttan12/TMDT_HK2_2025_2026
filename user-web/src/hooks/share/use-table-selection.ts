import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';

// Định nghĩa Return Interface kèm theo Generic <T>
export interface UseTableSelectionReturn<T> {
	selected: T[];
	onToggle: (key: T) => void;
	onToggleAll: () => void;
	isSelected: (key: T) => boolean;
	isAllSelected: boolean;
	isIndeterminate: boolean;
	reset: () => void;
	setSelected: Dispatch<SetStateAction<T[]>>;
}

export function useTableSelection<T>(allKeys: T[]): UseTableSelectionReturn<T> {
	const [selected, setSelected] = useState<T[]>([]);

	// toggle 1 row
	const toggle = useCallback((key: T): void => {
		setSelected((prev: T[]): T[] =>
			prev.includes(key) ? prev.filter((k): boolean => k !== key) : [...prev, key],
		);
	}, []);

	// toggle all
	const toggleAll = useCallback((): void => {
		setSelected((prev: T[]): T[] => (prev.length === allKeys.length ? [] : allKeys));
	}, [allKeys]);

	// check selected
	const isSelected = useCallback((key: T): boolean => selected.includes(key), [selected]);

	// trạng thái select all
	const isAllSelected: boolean = useMemo(
		(): boolean => selected.length === allKeys.length && allKeys.length > 0,
		[selected, allKeys],
	);

	const isIndeterminate: boolean = useMemo(
		(): boolean => selected.length > 0 && selected.length < allKeys.length,
		[selected, allKeys],
	);

	const reset = useCallback((): void => setSelected([]), []);

	return {
		selected: selected,
		onToggle: toggle,
		onToggleAll: toggleAll,
		isSelected: isSelected,
		isAllSelected: isAllSelected,
		isIndeterminate: isIndeterminate,
		reset: reset,
		setSelected: setSelected, // optional nếu cần control ngoài
	};
}
