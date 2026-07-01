import { PaginationParams } from '@/types/common/Pagination';
import { ResponseApi } from '@/types/common/ResponseApi';
import { BackendProductDetailDto } from '@/types/products/admin/BackendProductDetailDto';
import { BackendProductDTO } from '@/types/products/admin/BackendProductDTO';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { mapBackendPagedProductToAdmin, mapProductDetailToFrontend } from '@/utils/products/admin-product';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';
import { type AxiosInstance } from 'axios';

export const getProductListInfoAdminMocking = async ({
	page = 1,
	limit = 10,
}: PaginationRequest = {}): Promise<BackendPagedResult<ProductListInfoAdmin>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const mockProducts: ProductListInfoAdmin[] = [
				{
					id: '550e8400-e29b-41d4-a716-446655440000',
					name: 'Bonsai Tree Ecosystem',
					image: 'https://cdn.hstatic.net/products/200000968796/p4_4de79927f8ed486fb7b9c1527101c423_large.png',
					systemStatus: 'approved',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '123e4567-e89b-12d3-a456-426614174000',
					name: 'Rainforest Moss Bowl',
					image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
					systemStatus: 'pending_approval',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '987e6543-e21b-34d3-b456-426614174111',
					name: 'Desert Succulent Oasis',
					image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500&q=80',
					systemStatus: 'rejected',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '111e2222-e33b-44d3-c456-426614174222',
					name: 'Geometric Glass Terrarium',
					image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&q=80',
					systemStatus: 'banned',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '333e4444-e55b-66d3-d456-426614174333',
					name: 'Fittonia Closed Bottle',
					image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
					systemStatus: 'approved',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
			];

			// 2. Trả về cấu trúc PaginationResponse chuẩn
			resolve({
				items: mockProducts,
				totalCount: mockProducts.length,
				pageNumber: page,
				pageSize: limit,
				totalPages: Math.ceil(mockProducts.length / limit),
				hasNextPage: page * limit < mockProducts.length,
				hasPreviousPage: page > 1,
			});
		}, 500); // Thêm độ trễ 500ms
	});
};

export async function getProductDetailAdminByProductIdMocking(
	productId: string,
): Promise<ProductDetailInfoAdmin> {
	return new Promise<ProductDetailInfoAdmin>((resolve) => {
		setTimeout((): void => {
			resolve({
				id: '1',
				name: 'Bonsai Tree Ecosystem',

				supplierName: 'Terrafulness',

				description:
					'Hệ sinh thái thu nhỏ với cây Bonsai dáng nghệ thuật, rêu rừng xanh ngát và đá Tiger tự nhiên. Phù hợp trang trí bàn làm việc, mang lại cảm giác thư thái và gần gũi với thiên nhiên.',

				importPrice: 850000,
				discount: calculateDiscount(1500000, 1250000),

				systemStatus: 'approved',
				category: 'bonsai',

				images: [
					{
						localId: crypto.randomUUID(),
						imageUrl:
							'https://cdn.hstatic.net/products/200000968796/hh_2_665d74d1905d47a09301ec753244dc0c.png',
						order: 0,
						isPrimary: true,
						status: 'done',
						progress: 100,
					},
					{
						localId: crypto.randomUUID(),
						imageUrl:
							'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&q=80',
						order: 1,
						isPrimary: false,
						status: 'done',
						progress: 100,
					},
				],

				createdAt: '2024-01-10T10:00:00Z',
				updatedAt: '2024-02-01T15:30:00Z',

				// Các phân loại dựa trên: Kích thước bình (Size) & Loại nắp (Lid)
				productVariants: [
					{
						id: 'c8e1467a-1234-4f01-a12b-d32109876543', // Đổi thành GUID
						productId: '550e8400-e29b-41d4-a716-446655440000', // Đã ánh xạ đúng GUID của 'Bonsai Tree Ecosystem'
						name: 'Size S - Nắp Bần',
						sku: 'BON-S-CORK',
						quantity: 12,
						costPrice: 550000,
						salePrice: 850000,
						image: 'https://cdn.hstatic.net/products/200000968796/hh_1_37e2ef90ce974747b6e5157dfdbc9621.png',
					},
					{
						id: 'a9b2345c-6789-4e21-b34c-f98765432109',
						productId: '550e8400-e29b-41d4-a716-446655440000',
						name: 'Size S - Đế Đèn LED',
						sku: 'BON-S-LED',
						quantity: 8,
						costPrice: 750000,
						salePrice: 1150000,
						image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
					},
					{
						id: '7b233a01-5242-4f3b-8531-180a3a7800ab',
						productId: '550e8400-e29b-41d4-a716-446655440000',
						name: 'Size M - Nắp Bần',
						sku: 'BON-M-CORK',
						quantity: 10,
						costPrice: 850000,
						salePrice: 1250000,
						image: 'https://cdn.hstatic.net/products/200000968796/hh_2_665d74d1905d47a09301ec753244dc0c.png',
					},
					{
						id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
						productId: '550e8400-e29b-41d4-a716-446655440000',
						name: 'Size M - Đế Đèn LED',
						sku: 'BON-M-LED',
						quantity: 15,
						costPrice: 1050000,
						salePrice: 1550000,
						image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
					},
					{
						id: 'e58ed763-928c-4155-bee9-fdbaaadc15f3',
						productId: '550e8400-e29b-41d4-a716-446655440000',
						name: 'Size L - Nắp Bần',
						sku: 'BON-L-CORK',
						quantity: 6,
						costPrice: 1200000,
						salePrice: 1850000,
						image: 'https://cdn.hstatic.net/products/200000968796/hh_2_665d74d1905d47a09301ec753244dc0c.png',
					},
					{
						id: 'bc7b2671-5085-40b9-a9a2-944a86f7df21',
						productId: '550e8400-e29b-41d4-a716-446655440000',
						name: 'Size L - Đế Đèn LED',
						sku: 'BON-L-LED',
						quantity: 9,
						costPrice: 1400000,
						salePrice: 2150000,
						image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
					},
				],
			});
		}, 500);
	});
}

export const getProductApprovalListAdminMocking = async ({
	page = 1,
	limit = 10,
}: PaginationRequest = {}): Promise<BackendPagedResult<ProductListInfoAdmin>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const mockProducts: ProductListInfoAdmin[] = [
				{
					id: '550e8400-e29b-41d4-a716-446655440000',
					name: 'Bonsai Tree Ecosystem',
					image: 'https://cdn.hstatic.net/products/200000968796/p4_4de79927f8ed486fb7b9c1527101c423_large.png',
					systemStatus: 'approved',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '123e4567-e89b-12d3-a456-426614174000',
					name: 'Rainforest Moss Bowl',
					image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
					systemStatus: 'pending_approval',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '987e6543-e21b-34d3-b456-426614174111',
					name: 'Desert Succulent Oasis',
					image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500&q=80',
					systemStatus: 'rejected',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '111e2222-e33b-44d3-c456-426614174222',
					name: 'Geometric Glass Terrarium',
					image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&q=80',
					systemStatus: 'banned',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '333e4444-e55b-66d3-d456-426614174333',
					name: 'Fittonia Closed Bottle',
					image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
					systemStatus: 'approved',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
			];

			// 2. Trả về cấu trúc PaginationResponse chuẩn
			resolve({
				items: mockProducts,
				totalCount: mockProducts.length,
				pageNumber: page,
				pageSize: limit,
				totalPages: Math.ceil(mockProducts.length / limit),
				hasNextPage: page * limit < mockProducts.length,
				hasPreviousPage: page > 1,
			});
		}, 500); // Thêm độ trễ 500ms
	});
};

export const getProductListInfoByShopId = async (
	{ page = 1, limit = 10 }: PaginationRequest = {},
): Promise<BackendPagedResult<ProductListInfoAdmin>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const mockProducts: ProductListInfoAdmin[] = [
				{
					id: '550e8400-e29b-41d4-a716-446655440000',
					name: 'Bonsai Tree Ecosystem',
					image: 'https://cdn.hstatic.net/products/200000968796/p4_4de79927f8ed486fb7b9c1527101c423_large.png',
					systemStatus: 'approved',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '123e4567-e89b-12d3-a456-426614174000',
					name: 'Rainforest Moss Bowl',
					image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
					systemStatus: 'pending_approval',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '987e6543-e21b-34d3-b456-426614174111',
					name: 'Desert Succulent Oasis',
					image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500&q=80',
					systemStatus: 'rejected',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '111e2222-e33b-44d3-c456-426614174222',
					name: 'Geometric Glass Terrarium',
					image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&q=80',
					systemStatus: 'banned',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '333e4444-e55b-66d3-d456-426614174333',
					name: 'Fittonia Closed Bottle',
					image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
					systemStatus: 'approved',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
			];

			// 2. Trả về cấu trúc PaginationResponse chuẩn
			resolve({
				items: mockProducts,
				totalCount: mockProducts.length,
				pageNumber: page,
				pageSize: limit,
				totalPages: Math.ceil(mockProducts.length / limit),
				hasNextPage: page * limit < mockProducts.length,
				hasPreviousPage: page > 1,
			});
		}, 500); // Giả lập độ trễ mạng 500ms
	});
};

export const getProductListInfoAdminForProductApprovals = async (): Promise<
	ProductListInfoAdmin[]
> => {
	const mockProducts: ProductListInfoAdmin[] = [
		{
			id: '550e8400-e29b-41d4-a716-446655440000', // Đã chuyển sang GUID
			name: 'Bonsai Tree Ecosystem',
			image: 'https://cdn.hstatic.net/products/200000968796/p4_4de79927f8ed486fb7b9c1527101c423_large.png',
			systemStatus: 'approved',
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: '123e4567-e89b-12d3-a456-426614174000', // Đã chuyển sang GUID
			name: 'Rainforest Moss Bowl',
			image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
			systemStatus: 'pending_approval',
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: '987e6543-e21b-34d3-b456-426614174111', // Đã chuyển sang GUID
			name: 'Desert Succulent Oasis',
			image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500&q=80',
			systemStatus: 'rejected',
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: '111e2222-e33b-44d3-c456-426614174222', // Đã chuyển sang GUID
			name: 'Geometric Glass Terrarium',
			image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&q=80',
			systemStatus: 'banned',
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: '333e4444-e55b-66d3-d456-426614174333', // Đã chuyển sang GUID
			name: 'Fittonia Closed Bottle',
			image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
			systemStatus: 'approved',
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
	];

	return mockProducts;
};

export class ProductAdminService {
	constructor(private api: AxiosInstance) {}

	async getProductListInfoAdmin(
		pagination: PaginationParams,
	): Promise<BackendPagedResult<ProductListInfoAdmin>> {
		try {
			const params = {
				...pagination,
			};
			const response = await this.api.get<
				ResponseApi<BackendPagedResult<BackendProductDTO>>
			>(`/products/admin/list`, {
				params,
			});

			console.log('supplier list paging data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getProductListInfoAdminMocking();
			}

			return mapBackendPagedProductToAdmin(response.data.data);
		} catch (error: unknown) {
			console.error(error);
			return await getProductListInfoAdminMocking();
		}
	}

	async getProductDetailAdminByProductId(productId: string): Promise<ProductDetailInfoAdmin> {
		try {
			const response = await this.api.get<ResponseApi<BackendProductDetailDto>>(
				`/products/admin/detail?productId=${productId}`,
			);

			console.log('products  data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getProductDetailAdminByProductIdMocking(productId);
			}

			const formattedData = mapProductDetailToFrontend(response.data.data);

			console.log('products  data', formattedData);

			return formattedData;
		} catch (error: unknown) {
			console.error(error);
			return await getProductDetailAdminByProductIdMocking(productId);
		}
	}

	async getProductApprovalListAdmin(
		pagination: PaginationParams,
	): Promise<BackendPagedResult<ProductListInfoAdmin>> {
		try {
			const params = {
				...pagination,
			};
			const response = await this.api.get<
				ResponseApi<BackendPagedResult<BackendProductDTO>>
			>(`/products/admin/list/approval`, {
				params,
			});

			console.log('supplier list paging data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getProductApprovalListAdminMocking();
			}

			return mapBackendPagedProductToAdmin(response.data.data);
		} catch (error: unknown) {
			console.error(error);
			return await getProductApprovalListAdminMocking();
		}
	}

	async approveProduct(productId: string): Promise<string> {
		try {
			const response = await this.api.patch<ResponseApi<string>>(`/products/admin/approval`, {
				params: productId,
			});

			console.log('approve product data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return '';
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return '';
		}
	}

	async getProductListInfoByShopId(
		pagination: PaginationRequest = {},
	): Promise<BackendPagedResult<ProductListInfoAdmin>> {
		try {
			const params = {
				...pagination,
			};
			const response = await this.api.get<
				ResponseApi<BackendPagedResult<BackendProductDTO>>
			>(`/products/admin/list/me`, {
				params,
			});

			console.log('product list me paging data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getProductListInfoByShopId();
			}

			return mapBackendPagedProductToAdmin(response.data.data);
		} catch (error: unknown) {
			console.error(error);
			return await getProductListInfoByShopId();
		}
	}
}
