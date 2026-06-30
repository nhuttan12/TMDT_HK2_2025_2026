import { ResponseApi } from '@/types/common/ResponseApi';
import { CreateSupplierRequestDto } from '@/types/inventories/suppliers/CreateSupplierRequest';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { SupplierOption } from '@/types/inventories/suppliers/SupplierOption';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { type AxiosInstance } from 'axios';

export const getGoodsSupplierListPagingMocking = async ({
	page = 1,
	limit = 10,
}: PaginationRequest = {}): Promise<BackendPagedResult<Supplier>> => {
	const mockSuppliers: Supplier[] = [
		{
			id: 'e6a8b7c2-58cc-4b01-90e6-d701748f0851', // Đã chuyển sang GUID string
			name: 'Công ty Cổ phần Bao bì Việt Nam',
			contactName: 'Nguyễn Văn A',
			phone: '0901234567',
			email: 'contact@baobivn.com',
			address: '123 Đường Số 1, KCN Tân Bình, Quận Tân Phú, TP.HCM',
			taxCode: '0101234567',
		},
		{
			id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d', // Đã chuyển sang GUID string
			name: 'Cơ sở Sản xuất Nhựa Hùng Phát',
			// Không có email để test UI
			contactName: 'Lê Thị B',
			phone: '0987654321',
			address: '45/2A Ấp 3, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP.HCM',
			taxCode: '0312345678',
		},
		{
			id: '7b233a01-5242-4f3b-8531-180a3a7800ab', // Đã chuyển sang GUID string
			name: 'Công ty TNHH Nhập khẩu Vina',
			// Thiếu hoàn toàn thông tin người liên hệ (contactName, phone, email)
			address: 'Tầng 3, Tòa nhà Bitexco, Số 2 Hải Triều, Quận 1, TP.HCM',
			taxCode: '0309876543',
		},
		{
			id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', // Đã chuyển sang GUID string
			name: 'Tập đoàn Vận tải Global',
			// Có email nhưng không có phone
			contactName: 'Trần Đại C',
			email: 'support@globaltransport.vn',
			address: 'Số 9 Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, TP.HCM',
			taxCode: '0105678901',
		},
		{
			id: 'e58ed763-928c-4155-bee9-fdbaaadc15f3', // Đã chuyển sang GUID string
			name: 'Nhà phân phối Hương Liệu Á Châu',
			contactName: 'Phạm Văn D',
			phone: '0934567890',
			email: 'info@asiaflavor.com',
			// Địa chỉ rất dài để test tính năng truncate max-w
			address:
				'Lô C2-3-4, Đường D1, Khu Công Nghệ Cao, Phường Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
			taxCode: '0311122233',
		},
	];

	return {
		items: mockSuppliers,
		totalCount: mockSuppliers.length,
		pageNumber: page,
		pageSize: limit,
		totalPages: Math.ceil(mockSuppliers.length / limit),
		hasNextPage: page * limit < mockSuppliers.length,
		hasPreviousPage: page > 1,
	};
};

export const getProductPagingBySupplierIdMocking = async (
	supplierId: string,
	{ page = 1, limit = 10 }: PaginationRequest = {},
): Promise<BackendPagedResult<ProductListInfoAdmin>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const mockProducts: ProductListInfoAdmin[] = [
				{
					id: '550e8400-e29b-41d4-a716-446655440000',
					name: 'Bonsai Tree Ecosystem',
					image: 'https://cdn.hstatic.net/products/200000968796/p4_4de79927f8ed486fb7b9c1527101c423_large.png',
					status: true,
					systemStatus: 'approved',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '123e4567-e89b-12d3-a456-426614174000',
					name: 'Rainforest Moss Bowl',
					image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
					status: true,
					systemStatus: 'pending_approval',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '987e6543-e21b-34d3-b456-426614174111',
					name: 'Desert Succulent Oasis',
					image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500&q=80',
					status: false,
					systemStatus: 'rejected',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '111e2222-e33b-44d3-c456-426614174222',
					name: 'Geometric Glass Terrarium',
					image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&q=80',
					status: true,
					systemStatus: 'banned',
					createdAt: '2024-01-10T10:00:00Z',
					updatedAt: '2024-02-01T15:30:00Z',
				},
				{
					id: '333e4444-e55b-66d3-d456-426614174333',
					name: 'Fittonia Closed Bottle',
					image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
					status: false,
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

export const getSupplierDetailBySupplierIdMocking = async (
	supplierId: string,
): Promise<Supplier> => {
	const mockSupplier: Supplier = {
		id: 'e6a8b7c2-58cc-4b01-90e6-d701748f0851', // Đồng bộ đúng GUID của Công ty Bao bì Việt Nam
		name: 'Công ty Cổ phần Bao bì Việt Nam',
		contactName: 'Nguyễn Văn A',
		phone: '0901234567',
		email: 'contact@baobivn.com',
		address: '123 Đường Số 1, KCN Tân Bình, Quận Tân Phú, TP.HCM',
		taxCode: '0101234567',
	};

	return mockSupplier;
};

export const getSupplierOptionsByShopIdMocking = async (): Promise<SupplierOption[]> => {
	const mockData: SupplierOption[] = [
		{ id: 'e6a8b7c2-58cc-4b01-90e6-d701748f0851', name: 'Công ty CP Hàng Tiêu Dùng Masan' },
		{
			id: 'e6a8b7c2-58cc-4b01-90e6-d701748f0852',
			name: 'Nhà phân phối Nước giải khát Suntory PepsiCo',
		},
		{ id: 'e6a8b7c2-58cc-4b01-90e6-d701748f0853', name: 'Đại lý Nông sản sạch Đà Lạt' },
	];

	return new Promise((resolve): void => {
		setTimeout(() => {
			const result = mockData;
			resolve(result);
		}, 500);
	});
};

export class GoodsSupplierService {
	constructor(private api: AxiosInstance) {}

	async getGoodsSupplierListPaging({ page = 1, limit = 10 }: PaginationRequest = {}): Promise<
		BackendPagedResult<Supplier>
	> {
		try {
			const response = await this.api.get<ResponseApi<BackendPagedResult<Supplier>>>(
				`/admin/supplier?PageNumber=${page}&PageSize=${limit}`,
			);

			console.log('supplier list paging data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getGoodsSupplierListPagingMocking();
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getGoodsSupplierListPagingMocking();
		}
	}

	async getProductPagingBySupplierId(
		supplierId: string,
		{ page = 1, limit = 10 }: PaginationRequest = {},
	): Promise<BackendPagedResult<ProductListInfoAdmin>> {
		try {
			const response = await this.api.get<
				ResponseApi<BackendPagedResult<ProductListInfoAdmin>>
			>(
				`/admin/supplier/products?supplierId=${supplierId}&PageNumber=${page}&PageSize=${limit}`,
			);

			console.log('product paging by supplier data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getProductPagingBySupplierIdMocking(supplierId, { page, limit });
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getProductPagingBySupplierIdMocking(supplierId, { page, limit });
		}
	}

	async getSupplierDetailBySupplierId(supplierId: string): Promise<Supplier> {
		try {
			const response = await this.api.get<ResponseApi<Supplier>>(
				`/admin/supplier/detail?supplierId=${supplierId}`,
			);

			console.log('supplier detail data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getSupplierDetailBySupplierIdMocking(supplierId);
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getSupplierDetailBySupplierIdMocking(supplierId);
		}
	}

	async getSupplierOptionsByShopId(): Promise<SupplierOption[]> {
		try {
			const response =
				await this.api.get<ResponseApi<SupplierOption[]>>(`/admin/supplier/drop-down`);

			console.log('supplier option data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
				return await getSupplierOptionsByShopIdMocking();
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getSupplierOptionsByShopIdMocking();
		}
	}

	async createSupplier(supplier: CreateSupplierRequestDto): Promise<string> {
		try {
			const response = await this.api.post<ResponseApi<string>>(`/admin/supplier`, supplier);

			console.log('supplier data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				return '';
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return '';
		}
	}
}
