import { PaginationMeta } from './PaginationMeta';

export interface PaginationResponse<T> {
	data: T[];
	meta: PaginationMeta;
}
