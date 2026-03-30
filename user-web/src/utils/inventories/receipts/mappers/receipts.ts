import { CreateGoodsReceiptDto } from '@/types/inventories/receipts/dtos/CreateGoodsReceiptDto';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { UpdateGoodsReceiptDto } from '@/types/inventories/receipts/dtos/UpdateGoodsReceiptDto';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { CreateGoodsReceiptBatchDto } from '@/types/inventories/receipts/dtos/CreateGoodsReceiptBatchDto';
import { UpdateGoodsReceiptBatchDto } from '@/types/inventories/receipts/dtos/UpdateGoodsReceiptBatchDto';

function mapBatchToDto(batch: GoodsReceiptBatch): CreateGoodsReceiptBatchDto {
	return {
		productId: batch.productId,
		batchNumber: batch.batchNumber,
		quantity: batch.quantity,
		unitPrice: batch.unitPrice,
		manufacturedAt: batch.manufacturedAt,
		expiredAt: batch.expiredAt,
		serialNumbers: undefined
	};
}

export function mapGoodsReceiptToCreateDto(
	data: GoodsReceiptDetail,
): CreateGoodsReceiptDto {
	return {
		code: data.code || undefined,
		supplierID: data.supplierID,
		importDate: data.importDate,
		note: data.note,
		batches: data.batches.map(mapBatchToDto)
	};
}

function mapBatchToUpdateDto(
	batch: GoodsReceiptBatch
): UpdateGoodsReceiptBatchDto {
	return {
		id: batch.id,
		productId: batch.productId,
		quantity: batch.quantity,
		unitPrice: batch.unitPrice,
		batchNumber: batch.batchNumber,
		expiredAt: batch.expiredAt,
		serialNumber: undefined
	};
}

export function mapGoodsReceiptToUpdateDto(
	data: GoodsReceiptDetail
): UpdateGoodsReceiptDto {
	return {
		id: data.id,
		code: data.code,
		supplierID: data.supplierID,
		importDate: data.importDate,
		note: data.note,
		batches: data.batches.map(mapBatchToUpdateDto)
	};
}
