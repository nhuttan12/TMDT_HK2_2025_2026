export interface BaseUpdateSortableImagePayload {
	id?: string;
	imageUrl?: string;
	order: number;
	isPrimary: boolean;
}