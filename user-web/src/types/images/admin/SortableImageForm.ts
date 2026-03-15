import { BaseImage } from '@/types/images/admin/BaseImage';

export interface SortableImageForm extends BaseImage {
	isPrimary: boolean;
	order: number;
}
