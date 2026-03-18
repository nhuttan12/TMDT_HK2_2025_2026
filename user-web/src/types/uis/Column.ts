import React from 'react';

export interface Column<T> {
	key: keyof T | string;
	header: React.ReactNode;
	render?: (row: T) => React.ReactNode;
	className?: string;
	onHeaderClick?: () => void;
}
