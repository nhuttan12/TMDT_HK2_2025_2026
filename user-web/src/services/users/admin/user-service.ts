import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';

export async function getCustomerList(): Promise<CustomerListAdmin[]> {
	return new Promise<CustomerListAdmin[]>((resolve) => {
		setTimeout(() => {
			// Giả lập trả về danh sách dựa theo mode
			resolve([
				{
					id: 101,
					fullName: 'Nguyễn Văn An',
					email: 'an.nguyen@gmail.com',
					phone: '0909123456',
					avatar: 'https://i.pravatar.cc/150?img=11',
					role: 'customer',
					status: true,
					createdAt: '2024-01-05T08:30:00Z',
				},
				{
					id: 102,
					fullName: 'Trần Thị Bình',
					email: 'binh.tran@gmail.com',
					phone: '0911222333',
					avatar: 'https://i.pravatar.cc/150?img=12',
					role: 'customer',
					status: false,
					createdAt: '2024-01-10T09:00:00Z',
				},
				{
					id: 103,
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

export async function getUserDetailAdminById(id: number): Promise<UserDetailInfoAdmin> {
	return new Promise<UserDetailInfoAdmin>((resolve) => {
		setTimeout((): void => {
			resolve({
				id: 1,
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
