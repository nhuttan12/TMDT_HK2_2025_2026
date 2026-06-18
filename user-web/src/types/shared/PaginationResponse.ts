import { PaginationMeta } from './PaginationMeta';

export interface PaginationResponse<T> {
	data: T[];
	meta: PaginationMeta;
}
export interface PaginationResponse2<T> {
	data: T[];
	totalCount: number;
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}
