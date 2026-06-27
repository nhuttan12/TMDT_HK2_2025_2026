import { CategoryItem } from '@/types/categories/user/CategoryItem';
import apiClient from '@/lib/api-client';
import { ResponseApi } from '@/types/common/ResponseApi';
import { BackendPagedResult } from '@/types/products/user/productBE';

export const getCategoriesCraw = async (): Promise<CategoryItem[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 'glass-tanks', name: 'Bể kính', href: '/categories/tanks', iconName: 'Box' },
				{ id: 'plants', name: 'Cây cảnh', href: '/categories/plants', iconName: 'Flower2' },
				{ id: 'moss', name: 'Rêu tươi', href: '/categories/moss', iconName: 'Sprout' },
				{ id: 'soil', name: 'Đất nền', href: '/categories/soil', iconName: 'Leaf' },
				{
					id: 'hardscape',
					name: 'Đá & Lũa',
					href: '/categories/hardscape',
					iconName: 'Mountain',
				},
				{ id: 'lighting', name: 'Đèn LED', href: '/categories/lighting', iconName: 'Lamp' },
				{ id: 'tools', name: 'Dụng cụ', href: '/categories/tools', iconName: 'Scissors' },
				{
					id: 'fertilizer',
					name: 'Dinh dưỡng',
					href: '/categories/fertilizer',
					iconName: 'Droplet',
				},
				{
					id: 'diy-kits',
					name: 'Bộ Kit tự làm',
					href: '/categories/kits',
					iconName: 'Package',
				},
				{
					id: 'accessories',
					name: 'Phụ kiện',
					href: '/categories/accessories',
					iconName: 'Hammer',
				},
			]);
		}, 800);
	});
};

export const getCategories = async (): Promise<CategoryItem[]> => {
	try{
		const response = await apiClient.get<ResponseApi<BackendPagedResult<CategoryBE>>>(
			`/categories`,
			{
				params: {
					PageNumber: 1,
					PageSize: 10
				},
			},
		);
		if (response === null || !response.data || !response.data.isSuccess || !response.data.data) {
			return await getCategoriesCraw();
		}

		return MapListCategoryBe2Fe(response.data.data.items);
	}catch (error : unknown){
		return await getCategoriesCraw();
	}
};
export interface CategoryBE {
	id: string;
	name: string;
	sku: string;
	imageUrl: string;
}

function MapListCategoryBe2Fe(data: CategoryBE[]): CategoryItem[] {
	// Fail Fast: Kiểm tra đầu vào ngay lập tức để tránh lỗi runtime "Cannot read properties of undefined"
	if (!data || !Array.isArray(data) || data.length === 0) {
		return [];
	}

	return data.map((item) => ({
		id: item.id,
		name: item.name,
		// Dùng Template Literals chuẩn ES6 để nối chuỗi, giả định URL có dấu "/" ở trước
		href: `/category/${item.sku}`,
		// Map imageUrl từ Backend trực tiếp vào iconName của Frontend
		iconName: item.imageUrl,
	}));
}