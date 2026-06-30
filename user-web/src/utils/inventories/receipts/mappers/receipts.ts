import { CreateGoodsReceiptDto } from '@/types/inventories/receipts/dtos/CreateGoodsReceiptDto';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { UpdateGoodsReceiptDto } from '@/types/inventories/receipts/dtos/UpdateGoodsReceiptDto';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { CreateGoodsReceiptBatchDto } from '@/types/inventories/receipts/dtos/CreateGoodsReceiptBatchDto';
import { UpdateGoodsReceiptBatchDto } from '@/types/inventories/receipts/dtos/UpdateGoodsReceiptBatchDto';
import { CreateGoodsReceiptRequest } from '@/types/inventories/receipts/dtos/CreateGoodsReceiptRequest';
import { BatchItem } from '@/types/inventories/receipts/uis/BatchItem';

function mapBatchToDto(batch: GoodsReceiptBatch): CreateGoodsReceiptBatchDto {
	return {
		productId: batch.productId,
		batchCode: batch.batchCode,
		quantity: batch.quantity,
	};
}

export function mapGoodsReceiptToCreateDto(data: GoodsReceiptDetail): CreateGoodsReceiptDto {
	return {
		code: data.code || undefined,
		supplierID: data.supplierID,
		importDate: data.importDate,
		note: data.note,
		batches: data.batches.map(mapBatchToDto),
	};
}

function mapBatchToUpdateDto(batch: GoodsReceiptBatch): UpdateGoodsReceiptBatchDto {
	return {
		id: batch.id,
		productId: batch.productId,
		quantity: batch.quantity,
		batchCode: batch.batchCode,
	};
}

export function mapGoodsReceiptToUpdateDto(data: GoodsReceiptDetail): UpdateGoodsReceiptDto {
	return {
		id: data.id,
		code: data.code,
		supplierID: data.supplierID,
		importDate: data.importDate,
		note: data.note,
		batches: data.batches.map(mapBatchToUpdateDto),
	};
}

export const mapToGoodsReceiptRequest = (
	data: GoodsReceiptDetail,
	batchItems: Record<string, BatchItem[]>,
): CreateGoodsReceiptRequest => {
	return {
		code: data.code,
		supplierID: data.supplierID,
		supplierName: data.supplierName,
		importDate: data.importDate,
		note: data.note,
		batches: data.batches.map((batch) => ({
			productId: batch.productId,
			productName: batch.productName,
			batchCode: batch.batchCode,
			quantity: batch.quantity,
			totalPrice: batch.totalPrice,
			// Giả định bạn lưu BatchItems trong một store hoặc một field nào đó
			items: (batchItems[batch.id] || []).map((item) => ({
				productVariantId: item.productVariantId,
				productVariantName: item.productVariantName,
				costPrice: item.costPrice,
				productId: item.productId,
			})),
		})),
	};
};
