import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { CategoryResponse } from '@/types/categories/admin/CategoryResponse';

export async function getAdminCategories(): Promise<CategoryListItemAdmin[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					name: 'Điện thoại',
					slug: 'dien-thoai',
					image: 'https://crdms.images.consumerreports.org/prod/products/cr/models/399694-smartphones-apple-iphone-11-10008711.png',
					productCount: 120,
					status: true,
					createdAt: '2024-01-01T08:00:00Z',
					updatedAt: '2024-02-10T10:30:00Z',
				},
				{
					id: 2,
					name: 'Laptop',
					slug: 'laptop',
					image: 'https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopstopicpage-2048px-3685-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp',
					productCount: 85,
					status: true,
					createdAt: '2024-01-05T09:15:00Z',
					updatedAt: '2024-02-08T14:20:00Z',
				},
				{
					id: 3,
					name: 'Phụ kiện',
					slug: 'phu-kien',
					image: 'https://i.ytimg.com/vi/xq7Z5fXpKL8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBG994a2YhKIUsCAqBy9oGKQxCUPw',
					productCount: 0,
					status: false,
					createdAt: '2024-02-01T11:00:00Z',
					updatedAt: '2024-02-12T16:45:00Z',
				},
			]);
		}, 500);
	});
}

export async function getCategoryAdminDetailByCategoryId(categoryId: number): Promise<CategoryResponse> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: categoryId,
				name: 'Điện thoại',
				slug: 'dien-thoai',
				description: 'Danh mục điện thoại cao cấp',
				status: true,
				productCount: 120,
				imageUrl:
					'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_1.png',
				createdAt: '2024-01-01T10:00:00Z',
				updatedAt: '2024-02-01T10:00:00Z',
			});
		}, 500);
	});
}
