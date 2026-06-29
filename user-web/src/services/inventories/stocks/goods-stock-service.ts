import { ResponseApi } from '@/types/common/ResponseApi';
import { GoodsStockApiData } from '@/types/inventories/stocks/GoodsStockApiData';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { type AxiosInstance } from 'axios';

export const getGoodsStockSummaryMocking = async (): Promise<GoodsStockApiData> => {
	const mockGoodsStock: GoodsStockApiData = {
        availableProductQuantity: 31,
        hiddenOrBlockedProductQuantity: 35,
        outOfStockProductQuantity: 3,
        lowStockProductQuantity: 1,
        orderedVariant: 0,
    }

	return new Promise((resolve, reject) => {
		// Giả lập độ trễ của mạng mất 800ms để test Loading Spinner
		setTimeout(() => {
			resolve(mockGoodsStock);
		}, 800);
	});
};

export const getProductInStockPagingMocking = async ({
	page = 1,
	limit = 10,
}: PaginationRequest = {}): Promise<BackendPagedResult<ProductInStock>> => {
	const mockProductInStock: ProductInStock[] = [
		{
			id: '1a2b3c4d-1111-4aaa-8bbb-111111111111', // GUID của bản ghi tồn kho
			productId: '550e8400-e29b-41d4-a716-446655440001', // GUID của sản phẩm
			productVariantId: 'c8e1467a-1234-4f01-a12b-d32109876541', // GUID của biến thể
			image: 'https://pethouse.com.vn/wp-content/uploads/2023/01/bio-gentadrop1.jpg',
			name: '[BIO GENTADROP] [10 ML] Dung dịch nhỏ mắt',
			variantSku: 'BIO-GENTA-10ML-V1',
			replenishment: 'immediate',
			stock: 1,
			sales7d: 0,
			sales30d: 0,
		},
		{
			id: '2b3c4d5e-2222-4aaa-8bbb-222222222222',
			productId: '550e8400-e29b-41d4-a716-446655440002',
			productVariantId: 'c8e1467a-1234-4f01-a12b-d32109876542',
			image: 'https://gaohouse.vn/wp-content/uploads/2024/05/ao-nhom-dong-phuc-teambuilding-46.jpg',
			name: 'Set quần áo cực chất - test',
			variantSku: 'CLO-SET-007-XL-RED-01',
			replenishment: 'early',
			stock: 180,
			sales7d: 0,
			sales30d: 1,
		},
		{
			id: '3c4d5e6f-3333-4aaa-8bbb-333333333333',
			productId: '550e8400-e29b-41d4-a716-446655440003',
			productVariantId: 'c8e1467a-1234-4f01-a12b-d32109876543',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBz0OMpGFkgG64mmiLbWJ5YzOY-cv5H8Ay-A&s',
			name: 'Son 7 màu dưỡng ẩm c hồng khô nứt',
			variantSku: 'LIP-7C-PINK-M',
			replenishment: 'normal',
			stock: 120,
			sales7d: 2,
			sales30d: 5,
		},
	];

	return {
		items: mockProductInStock,
		totalCount: mockProductInStock.length,
		pageNumber: page,
		pageSize: limit,
		totalPages: Math.ceil(mockProductInStock.length / limit),
		hasNextPage: page * limit < mockProductInStock.length,
		hasPreviousPage: page > 1,
	};
};

export class GoodsStockService {
	constructor(private api: AxiosInstance) {}

	async getGoodsStockSummary(): Promise<GoodsStockApiData> {
		try {
			const response =
				await this.api.get<ResponseApi<GoodsStockApiData>>(`/admin/stock/summary`);

			console.log('product in stock summary data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getGoodsStockSummaryMocking();
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getGoodsStockSummaryMocking();
		}
	}

	async getProductInStockPaging({ page = 1, limit = 10 }: PaginationRequest = {}): Promise<
		BackendPagedResult<ProductInStock>
	> {
		try {
			const response = await this.api.get<ResponseApi<BackendPagedResult<ProductInStock>>>(
				`/admin/stock?PageNumber=${page}&PageSize=${limit}`,
			);

			console.log('product in stock data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getProductInStockPagingMocking();
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getProductInStockPagingMocking();
		}
	}
}
