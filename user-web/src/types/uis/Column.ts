import { MouseEvent, ReactNode } from 'react';

export interface Column<T> {
	key: keyof T | string;
	header: ReactNode;
	render?: (row: T, index?: number) => ReactNode;
	className?: string;
	onHeaderClick?: (e: MouseEvent<HTMLTableCellElement>) => void;
}
