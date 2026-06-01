import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';

export async function getCustomerList(): Promise<CustomerListAdmin[]> {
	return new Promise<CustomerListAdmin[]>((resolve) => {
		setTimeout(() => {
			// Giả lập trả về danh sách dựa theo mode
			resolve([
				{
					id: 'e0b3c2d4-1a2b-3c4d-5e6f-7a8b9c0d1e2f', // Chuyển sang GUID string
					fullName: 'Nguyễn Văn An',
					email: 'an.nguyen@gmail.com',
					phone: '0909123456',
					avatar: 'https://i.pravatar.cc/150?img=11',
					role: 'customer',
					status: true,
					createdAt: '2024-01-05T08:30:00Z',
				},
				{
					id: 'f1c4d3e5-2b3c-4d5e-6f7a-8b9c0d1e2f3a', // Chuyển sang GUID string
					fullName: 'Trần Thị Bình',
					email: 'binh.tran@gmail.com',
					phone: '0911222333',
					avatar: 'https://i.pravatar.cc/150?img=12',
					role: 'customer',
					status: false,
					createdAt: '2024-01-10T09:00:00Z',
				},
				{
					id: 'a2d5e4f6-3c4d-5e6f-7a8b-9c0d1e2f3a4b', // Chuyển sang GUID string
					fullName: 'Đỗ Thanh Tùng',
					email: 'tung.do@gmail.com',
					phone: '0933444555',
					avatar: 'https://i.pravatar.cc/150?img=13',
					role: 'customer',
					status: true,
					createdAt: '2024-01-25T07:20:00Z',
				},
			]);
		}, 500);
	});
}

export async function getUserDetailAdminById(id: string): Promise<UserDetailInfoAdmin> {
	return new Promise<UserDetailInfoAdmin>((resolve) => {
		setTimeout((): void => {
			resolve({
				id: 'b1e2c3d4-5f6a-7b8c-9d0e-1f2a3b4c5d6e', // Đã chuyển sang GUID string
				fullName: 'Nguyễn Văn A',
				email: 'nguyenvana@example.com',
				phone: '0901234567',
				avatar: 'https://i.pravatar.cc/300',
				role: 'shop-owner',
				status: true,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
		}, 500);
	});
}
