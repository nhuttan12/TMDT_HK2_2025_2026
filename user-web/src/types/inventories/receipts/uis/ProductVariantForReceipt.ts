import { BatchItemStatus } from './BatchItemStatus';

export interface ProductVariantForReceipt {
	serialNumber: string;
	productVariantName: string;
	appearanceCondition: string;
	status: BatchItemStatus;
}
