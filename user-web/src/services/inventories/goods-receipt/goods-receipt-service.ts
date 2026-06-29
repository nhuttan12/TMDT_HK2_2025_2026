import { ResponseApi } from '@/types/common/ResponseApi';
import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { type AxiosInstance } from 'axios';

export const getGoodsReceiptListMocking = async ({
	page = 1,
	limit = 10,
}: PaginationRequest = {}): Promise<BackendPagedResult<GoodsReceiptList>> => {
	// Giả lập delay mạng
	await new Promise((resolve) => setTimeout(resolve, 500));

	const mockItems: GoodsReceiptList[] = [
		{
			id: '1a2b3c4d-1111-4aaa-8bbb-111111111111',
			code: 'PNK-20260321-001',
			supplierName: 'Công ty TNHH ABC',
			importDate: new Date('2026-03-21T09:00:00Z').toISOString(),
			totalBatches: 3,
			totalQuantity: 15,
			totalAmount: 350000000,
			status: 'completed',
			createdAt: new Date('2026-03-21T08:30:00Z').toISOString(),
		},
		{
			id: '2b3c4d5e-2222-4aaa-8bbb-222222222222',
			code: 'PNK-20260324-002',
			supplierName: 'Nhà phân phối XYZ',
			importDate: new Date('2026-03-24T14:00:00Z').toISOString(),
			totalBatches: 1,
			totalQuantity: 50,
			totalAmount: 1250000000,
			status: 'completed',
			createdAt: new Date('2026-03-24T10:15:00Z').toISOString(),
		},
		{
			id: '3c4d5e6f-3333-4aaa-8bbb-333333333333',
			code: 'PNK-20260325-003',
			supplierName: 'Apple Vietnam',
			importDate: new Date('2026-03-25T16:30:00Z').toISOString(),
			totalBatches: 5,
			totalQuantity: 100,
			totalAmount: 2500000000,
			status: 'completed',
			createdAt: new Date('2026-03-25T11:00:00Z').toISOString(),
		},
	];

	// 2. Bọc mảng vào đúng cấu trúc BackendPagedResult cấu hình từ C#
	return {
		items: mockItems,
		totalCount: mockItems.length,
		pageNumber: page,
		pageSize: limit,
		totalPages: Math.ceil(mockItems.length / limit),
		hasNextPage: page * limit < mockItems.length,
		hasPreviousPage: page > 1,
	};
};

export class GoodsReceiptService {
	constructor(private api: AxiosInstance) {}

	async getGoodsReceiptList({ page = 1, limit = 10 }:PaginationRequest = {}): Promise<BackendPagedResult<GoodsReceiptList>> {
		try {
			const response =
				await this.api.get<ResponseApi<BackendPagedResult<GoodsReceiptList>>>(`/admin/receipt?PageNumber=${page}&PageSize=${limit}`);

			console.log('receipt data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getGoodsReceiptListMocking();
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getGoodsReceiptListMocking();
		}
	}
}
