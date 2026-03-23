import { CreateGoodsReceiptDto } from '@/types/inventories/receipts/CreateGoodsReceiptDto';
import { GoodsReceipt } from '@/types/inventories/receipts/GoodsReceipt';
import { GoodsReceiptItem } from '@/types/inventories/receipts/GoodsReceiptItem';
import { UpdateGoodsReceiptDto } from '@/types/inventories/receipts/UpdateGoodsReceiptDto';

export function mapToCreate(form: GoodsReceipt): CreateGoodsReceiptDto {
	return {
		supplierID: form.supplier!.id,
		warehouseID: form.warehouseID!,
		importDate: form.importDate,
		note: form.note,
		items: form.items.map((i: GoodsReceiptItem) => ({
			productID: i.productID,
			quantity: i.quantity,
			unitPrice: i.unitPrice,
			batchNumber: i.batchNumber,
			serialNumber: i.serialNumber,
			expiredAt: i.expiredAt,
			note: i.note,
		})),
	};
}

export function mapToUpdateDto(receipt: GoodsReceipt): UpdateGoodsReceiptDto {
	return {
		id: receipt.id,

		// chỉ map nếu có supplier
		supplierID: receipt.supplier?.id,

		warehouseID: receipt.warehouseID,
		importDate: receipt.importDate,
		note: receipt.note,

		items: receipt.items.map((item: GoodsReceiptItem) => ({
			id: item.id,

			productID: item.productID,
			quantity: item.quantity,
			unitPrice: item.unitPrice,

			batchNumber: item.batchNumber,
			serialNumber: item.serialNumber,
			expiredAt: item.expiredAt,
			note: item.note,
		})),
	};
}
