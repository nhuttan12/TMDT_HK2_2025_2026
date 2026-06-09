import { BatchItemStatus } from '@/types/inventories/receipts/uis/BatchItemStatus';

export interface BatchItemSerial {
	id: string;
	productId: string;

	batchId: string;
	productVariantId: string;
	productVariantName: string;

	serialNumber: string;

	costPrice: number

	appearanceCondition: string;

	status: BatchItemStatus;
	importDate: string;
	expiredAt?: string;
}
