import { CreateBatchItemRequest } from "./CreateBatchItemRequest";

export interface CreateBatchRequest {
    productId: string;
    productName: string;
    batchCode: string;
    quantity: number;
    totalPrice: number;
    items: CreateBatchItemRequest[];
}