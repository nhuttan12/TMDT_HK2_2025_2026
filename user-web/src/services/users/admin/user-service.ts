import { PaginationParams } from '@/types/common/Pagination';
import { ResponseApi } from '@/types/common/ResponseApi';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { BackendUserInfoDTO } from '@/types/users/admin/BackendUserInfoDTO';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';
import { mapUserInfoToCustomerList } from '@/utils/users/user-admin-mapper';
import { type AxiosInstance } from 'axios';

export async function getCustomerListMocking({
	page = 1,
	limit = 10,
}: PaginationRequest = {}): Promise<BackendPagedResult<CustomerListAdmin>> {
	return new Promise<BackendPagedResult<CustomerListAdmin>>((resolve) => {
		setTimeout(() => {
			// Giả lập trả về danh sách dựa theo mode
			const mockData: CustomerListAdmin[] = [
				{
					id: 'e0b3c2d4-1a2b-3c4d-5e6f-7a8b9c0d1e2f',
					fullName: 'Nguyễn Văn An',
					email: 'an.nguyen@gmail.com',
					phone: '0909123456',
					avatar: 'https://i.pravatar.cc/150?img=11',
					createdAt: '2024-01-05T08:30:00Z',
					lockTimeStart: '2024-01-05T08:30:00Z',
					lockTimeEnd: '2024-01-05T08:30:00Z',
				},
				{
					id: 'f1c4d3e5-2b3c-4d5e-6f7a-8b9c0d1e2f3a',
					fullName: 'Trần Thị Bình',
					email: 'binh.tran@gmail.com',
					phone: '0911222333',
					avatar: 'https://i.pravatar.cc/150?img=12',
					createdAt: '2024-01-10T09:00:00Z',
					lockTimeStart: '2024-01-05T08:30:00Z',
					lockTimeEnd: '2024-01-05T08:30:00Z',
				},
				{
					id: 'a2d5e4f6-3c4d-5e6f-7a8b-9c0d1e2f3a4b',
					fullName: 'Đỗ Thanh Tùng',
					email: 'tung.do@gmail.com',
					phone: '0933444555',
					avatar: 'https://i.pravatar.cc/150?img=13',
					createdAt: '2024-01-25T07:20:00Z',
					lockTimeStart: '2024-01-05T08:30:00Z',
					lockTimeEnd: '2024-01-05T08:30:00Z',
				},
			];

			const totalCount = mockData.length; // Tổng số lượng item thực tế (giả lập là 3)
			const totalPages = Math.ceil(totalCount / limit);

			// Bọc dữ liệu vào dạng BackendPagedResult
			resolve({
				items: mockData,
				totalCount: totalCount,
				pageNumber: page,
				pageSize: limit,
				totalPages: totalPages,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1,
			});
		}, 500);
	});
}

export async function getUserDetailAdminByIdMocking(id: string): Promise<UserDetailInfoAdmin> {
	return new Promise<UserDetailInfoAdmin>((resolve) => {
		setTimeout((): void => {
			resolve({
				id: 'b1e2c3d4-5f6a-7b8c-9d0e-1f2a3b4c5d6e', // Đã chuyển sang GUID string
				fullName: 'Nguyễn Văn A',
				email: 'nguyenvana@example.com',
				phone: '0901234567',
				avatar: 'https://i.pravatar.cc/300',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
		}, 500);
	});
}

export class UserAdminService {
	constructor(private api: AxiosInstance) {}

	async getCustomerList(
		pagingParam: PaginationParams,
	): Promise<BackendPagedResult<CustomerListAdmin>> {
		try {
			const flatParams = {
				...pagingParam,
			};
			const response = await this.api.get<
				ResponseApi<BackendPagedResult<BackendUserInfoDTO>>
			>(`/admin/users`, {
				params: flatParams,
			});

			console.log('users data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				return await getCustomerListMocking();
			}

			const mappedItems: CustomerListAdmin[] = response.data.data.items.map(
				(item: BackendUserInfoDTO) => mapUserInfoToCustomerList(item),
			);

			return {
            ...response.data.data,
            items: mappedItems,
        };
		} catch (error: unknown) {
			console.error(error);
			return await getCustomerListMocking();
		}
	}

	async getUserDetailAdminById(userId: string): Promise<UserDetailInfoAdmin> {
		try {
			const response = await this.api.get<ResponseApi<UserDetailInfoAdmin>>(
				`/admin/users/${userId}`,
			);

			console.log('users data', response.data.data);
			if (!response.data || !response.data.isSuccess || !response.data.data) {
				return await getUserDetailAdminByIdMocking(userId);
			}

			return response.data.data;
		} catch (error: unknown) {
			console.error(error);
			return await getUserDetailAdminByIdMocking(userId);
		}
	}

	async lockUser(userId: string): Promise<string> {
		try {
			const response = await this.api.post<ResponseApi<string>>(
				`/admin/users/${userId}/lock`,
			);

			console.log('users data', response.data.data);
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
