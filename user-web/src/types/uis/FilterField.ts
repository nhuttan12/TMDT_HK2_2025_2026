import { FilterFieldType } from './FilterFieldType';

export interface FilterField<T> {
	key: keyof T;
	label: string;
	type: FilterFieldType;
	placeholder?: string;
	options?: { label: string; value: string }[];
	gridSpan?: 1 | 2;
}