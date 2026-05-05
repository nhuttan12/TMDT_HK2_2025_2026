import { BaseImage } from '@/types/images/admin/BaseImage';

export interface Popup extends BaseImage {
	id?: string;
	isActive: boolean;
}
