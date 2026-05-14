import { CategoryItem } from "@/types/categories/user/CategoryItem";

export const getCategories = async (): Promise<CategoryItem[]> => {
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