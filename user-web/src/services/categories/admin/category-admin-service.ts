import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { CategoryResponse } from '@/types/categories/admin/CategoryResponse';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

export async function getAdminCategories({
	page = 1,
	limit = 10,
}: PaginationRequest = {}): Promise<PaginationResponse<CategoryListItemAdmin>> {
	return new Promise<PaginationResponse<CategoryListItemAdmin>>((resolve) => {
		setTimeout(() => {
			// Giả lập danh sách dữ liệu
			const mockData: CategoryListItemAdmin[] = [
				{
					id: '1a2b3c4d-1111-4aaa-8bbb-111111111111',
					name: 'Bể kính',
					slug: 'be-kinh',
					image: 'https://file.hstatic.net/1000100178/file/be-ca-mat-kinh-duc_f6d0bb000d624d5085737e5f0f7ffd3d_grande.jpg',
					productCount: 120,
					status: true,
					createdAt: '2024-01-01T08:00:00Z',
					updatedAt: '2024-02-10T10:30:00Z',
				},
				{
					id: '2b3c4d5e-2222-4aaa-8bbb-222222222222',
					name: 'Cây cảnh & Rêu',
					slug: 'cay-canh-reu',
					image: 'https://product.hstatic.net/200000903579/product/0091c1ffabe216bc4ff3_c9281a4d4db7465babe6f5d56d4974b0_master.jpg',
					productCount: 85,
					status: true,
					createdAt: '2024-01-05T09:15:00Z',
					updatedAt: '2024-02-08T14:20:00Z',
				},
				{
					id: '3c4d5e6f-3333-4aaa-8bbb-333333333333',
					name: 'Đất nền & Sỏi',
					slug: 'dat-nen-soi',
					image: 'https://file.hstatic.net/200000573099/file/trai-nen_0af0c88ac73a48b9b656232b42c7de17_grande.png',
					productCount: 0,
					status: false,
					createdAt: '2024-02-01T11:00:00Z',
					updatedAt: '2024-02-12T16:45:00Z',
				},
			];

			// Bọc dữ liệu vào dạng PaginationResponse
			resolve({
				data: mockData,
				meta: {
					totalItems: 3, // Tổng số lượng item
					totalPages: Math.ceil(3 / limit),
					currentPage: page,
					itemsPerPage: limit,
				},
			});
		}, 500);
	});
}

export async function getCategoryAdminDetailByCategoryId(
	categoryId: number,
): Promise<CategoryResponse> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: categoryId,
				name: 'Bể kính',
				slug: 'be-kinh',
				description:
					'Chuyên cung cấp các loại bể kính đa giác, trụ tròn, và bình thủy tinh có nắp đậy chuyên dụng cho việc setup hệ sinh thái Terrarium kín và hở.',
				status: true,
				productCount: 120,
				imageUrl:
					'https://file.hstatic.net/1000100178/file/be-ca-mat-kinh-duc_f6d0bb000d624d5085737e5f0f7ffd3d_grande.jpg',
				createdAt: '2024-01-01T10:00:00Z',
				updatedAt: '2024-02-01T10:00:00Z',
			});
		}, 500);
	});
}
