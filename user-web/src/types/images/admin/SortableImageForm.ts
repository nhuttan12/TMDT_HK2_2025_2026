import { BaseImage } from '@/types/images/admin/BaseImage';
import { UploadStatus } from '@/types/images/admin/UploadStatus';

export interface SortableImageForm extends BaseImage {
	localID: string;

	isPrimary: boolean;
	order: number;

	status: UploadStatus;
	progress?: number;
}
