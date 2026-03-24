import { BatchItemStatus } from '@/types/inventories/receipts/uis/BatchItemStatus';

export interface BatchItemSerial {
	id: number;
	batchID: number;
	productVariantID: number;
	productVariantName: string;

	serialNumber: string;

	appearanceCondition?: string;

	status: BatchItemStatus;
	importDate: string;
	expiredAt?: string;
}