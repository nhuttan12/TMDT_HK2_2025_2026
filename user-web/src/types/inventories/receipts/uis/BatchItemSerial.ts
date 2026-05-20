import { BatchItemStatus } from '@/types/inventories/receipts/uis/BatchItemStatus';

export interface BatchItemSerial {
	id: number;
	productId: number;

	batchId: number;
	productVariantId: number;
	productVariantName: string;

	serialNumber: string;

	costPrice: number

	appearanceCondition: string;

	status: BatchItemStatus;
	importDate: string;
	expiredAt?: string;
}
