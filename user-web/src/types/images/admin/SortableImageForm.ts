import { BaseImage } from '@/types/images/admin/BaseImage';
import { UploadStatus } from '@/types/images/admin/UploadStatus';

export interface SortableImageForm extends BaseImage {
	localId: string;

	isPrimary: boolean;
	order: number;

	status: UploadStatus;
	progress?: number;
}
