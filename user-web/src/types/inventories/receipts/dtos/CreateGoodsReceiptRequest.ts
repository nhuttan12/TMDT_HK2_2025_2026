import { CreateBatchRequest } from "./CreateBatchRequest";

export interface CreateGoodsReceiptRequest {
    code: string;
    supplierID: string;
    supplierName: string;
    importDate: string;
    note?: string;
    batches: CreateBatchRequest[];
}