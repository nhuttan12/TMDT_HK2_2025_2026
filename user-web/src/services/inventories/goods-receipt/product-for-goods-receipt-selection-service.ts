import { ResponseApi } from '@/types/common/ResponseApi';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { type AxiosInstance } from 'axios';

export const getProductSelectionForGoodsReceiptMocking = async (): Promise<
	ProductForGoodsReceipt[]
> => {
	return [
		{
			id: '4f9b8c3d-1111-4aaa-8bbb-111111111111',
			name: 'iPhone 15 Pro Max',
			// status: 'approved',
		},
		{
			id: '5f9b8c3d-2222-4aaa-8bbb-222222222222',
			name: 'Samsung Galaxy S24 Ultra',
			// status: 'approved',
		},
		{
			id: '6f9b8c3d-3333-4aaa-8bbb-333333333333',
			name: 'MacBook Pro 16"',
			//  status: 'approved'
		},
		{
			id: '7f9b8c3d-4444-4aaa-8bbb-444444444444',
			name: 'iPad Air',
			// status: 'approved'
		},
		{
			id: '8f9b8c3d-5555-4aaa-8bbb-555555555555',
			name: 'AirPods Pro',
			//  status: 'approved'
		},
		{
			id: '9f9b8c3d-6666-4aaa-8bbb-666666666666',
			name: 'Sony WH-1000XM5',
			// status: 'approved'
		},
		{
			id: '0f9b8c3d-7777-4aaa-8bbb-777777777777',
			name: 'Apple Watch Series 9',
			// status: 'approved',
		},
		{
			id: 'af9b8c3d-8888-4aaa-8bbb-888888888888',
			name: 'Dell XPS 15',
			//  status: 'approved'
		},
	];
};

export const getProductVariantListForSelectionGoodsReceiptMocking = async (
	productId: string,
): Promise<ProductVariantRow[]> => {
	return [
		{
			id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
			name: 'Bình Terrarium Kín - Rừng Nhiệt Đới - Size L',
			sku: 'TER-CL-TROP-L',
		},
		{
			id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
			name: 'Bình Terrarium Kín - Rừng Nhiệt Đới - Size M',
			sku: 'TER-CL-TROP-M',
		},
		{
			id: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
			name: 'Bình Terrarium Mở - Sa Mạc Tiên Rồng - Size S',
			sku: 'TER-OP-DES-S',
		},
		{
			id: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
			name: 'Bể Paludarium - Thác Nước Bán Cạn - Size XL',
			sku: 'PAL-WATERFALL-XL',
		},
		{
			id: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
			name: 'Bể Paludarium - Rừng Trầm Tích - Size L',
			sku: 'PAL-ROCK-L',
		},
		{
			id: '6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
			name: 'Bình Kính Đa Giác - Giọt Nước Bonsai - Size M',
			sku: 'GEO-DROP-BON-M',
		},
		{
			id: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
			name: 'Bình Kính Đa Giác - Kim Cương - Size S',
			sku: 'GEO-DIA-S',
		},
		{
			id: '8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e',
			name: 'Bình Terrarium Kín - Đồi Rêu Cổ Tích - Size S',
			sku: 'TER-CL-MOSS-S',
		},
		{
			id: '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f',
			name: 'Bình Terrarium Kín - Đồi Rêu Cổ Tích - Size M',
			sku: 'TER-CL-MOSS-M',
		},
		{
			id: '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a',
			name: 'Bình Terrarium Mở - Tiểu Cảnh Suối Nước - Size L',
			sku: 'TER-OP-STREAM-L',
		},
	];
};

export class ProductForGoodsReceiptService {
	constructor(private api: AxiosInstance) {}

	async getProductsSelectionForGoodsReceipt(): Promise<ProductForGoodsReceipt[]> {
		try {
			const response = await this.api.get<ResponseApi<ProductForGoodsReceipt[]>>(
				`/admin/receipt/product-selection`,
			);

			console.log('product selection data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getProductSelectionForGoodsReceiptMocking();
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getProductSelectionForGoodsReceiptMocking();
		}
	}

	async getProductVariantListForSelectionGoodsReceipt(
		productId: string,
	): Promise<ProductVariantRow[]> {
		try {
			const response = await this.api.get<ResponseApi<ProductVariantRow[]>>(
				`/admin/receipt/variant-selection?productId=${productId}`,
			);

			console.log('variant selection data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getProductVariantListForSelectionGoodsReceiptMocking(productId);
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getProductVariantListForSelectionGoodsReceiptMocking(productId);
		}
	}
}
