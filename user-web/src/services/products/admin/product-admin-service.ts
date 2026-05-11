import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';

export const getProductListInfoAdmin = async (): Promise<ProductListInfoAdmin[]> => {
	const mockProducts: ProductListInfoAdmin[] = [
		{
			id: 1,
			name: 'Bonsai Tree Ecosystem',
			slug: 'bonsai-tree-ecosystem',
			image: 'https://cdn.hstatic.net/products/200000968796/p4_4de79927f8ed486fb7b9c1527101c423_large.png',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 2,
			name: 'Rainforest Moss Bowl',
			slug: 'rainforest-moss-bowl',
			image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 3,
			name: 'Desert Succulent Oasis',
			slug: 'desert-succulent-oasis',
			image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500&q=80',
			status: false,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 4,
			name: 'Geometric Glass Terrarium',
			slug: 'geometric-glass-terrarium',
			image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&q=80',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 5,
			name: 'Fittonia Closed Bottle',
			slug: 'fittonia-closed-bottle',
			image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
			status: false,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
	];

	return mockProducts;
};

export async function getProductDetailAdminByProductId(
	productId: number,
): Promise<ProductDetailInfoAdmin> {
	return new Promise<ProductDetailInfoAdmin>((resolve) => {
		setTimeout((): void => {
			resolve({
				id: 1,
				name: 'Bonsai Tree Ecosystem',
				slug: 'bonsai-tree-ecosystem',

				supplierName: 'Terrafulness',

				description:
					'Hệ sinh thái thu nhỏ với cây Bonsai dáng nghệ thuật, rêu rừng xanh ngát và đá Tiger tự nhiên. Phù hợp trang trí bàn làm việc, mang lại cảm giác thư thái và gần gũi với thiên nhiên.',

				importPrice: 850000,
				discount: calculateDiscount(1500000, 1250000),

				status: true,
				categoryId: 1,

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

				// Các biến thể dựa trên: Kích thước bình (Size) & Loại nắp (Lid)
				productVariants: [
					{
						id: 1,
						productId: 1,
						name: 'Size S - Nắp Bần',
						sku: 'BON-S-CORK',
						quantity: 12,
						costPrice: 550000,
						salePrice: 850000,
						image: 'https://cdn.hstatic.net/products/200000968796/hh_1_37e2ef90ce974747b6e5157dfdbc9621.png',
					},
					{
						id: 2,
						productId: 1,
						name: 'Size S - Đế Đèn LED',
						sku: 'BON-S-LED',
						quantity: 8,
						costPrice: 750000,
						salePrice: 1150000,
						image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
					},
					{
						id: 3,
						productId: 1,
						name: 'Size M - Nắp Bần',
						sku: 'BON-M-CORK',
						quantity: 10,
						costPrice: 850000,
						salePrice: 1250000,
						image: 'https://cdn.hstatic.net/products/200000968796/hh_2_665d74d1905d47a09301ec753244dc0c.png',
					},
					{
						id: 4,
						productId: 1,
						name: 'Size M - Đế Đèn LED',
						sku: 'BON-M-LED',
						quantity: 15,
						costPrice: 1050000,
						salePrice: 1550000,
						image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
					},
					{
						id: 5,
						productId: 1,
						name: 'Size L - Nắp Bần',
						sku: 'BON-L-CORK',
						quantity: 6,
						costPrice: 1200000,
						salePrice: 1850000,
						image: 'https://cdn.hstatic.net/products/200000968796/hh_2_665d74d1905d47a09301ec753244dc0c.png',
					},
					{
						id: 6,
						productId: 1,
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

export const getProductListInfoByShopId = async (
	userId: number,
): Promise<ProductListInfoAdmin[]> => {
	const mockProducts: ProductListInfoAdmin[] = [
		{
			id: 1,
			name: 'Bonsai Tree Ecosystem',
			slug: 'bonsai-tree-ecosystem',
			image: 'https://cdn.hstatic.net/products/200000968796/p4_4de79927f8ed486fb7b9c1527101c423_large.png',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 2,
			name: 'Rainforest Moss Bowl',
			slug: 'rainforest-moss-bowl',
			image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 3,
			name: 'Desert Succulent Oasis',
			slug: 'desert-succulent-oasis',
			image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500&q=80',
			status: false,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 4,
			name: 'Geometric Glass Terrarium',
			slug: 'geometric-glass-terrarium',
			image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&q=80',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 5,
			name: 'Fittonia Closed Bottle',
			slug: 'fittonia-closed-bottle',
			image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
			status: false,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
	];

	return mockProducts;
};

export const getProductListInfoAdminForProductApprovals = async (): Promise<
	ProductListInfoAdmin[]
> => {
	const mockProducts: ProductListInfoAdmin[] = [
		{
			id: 1,
			name: 'Bonsai Tree Ecosystem',
			slug: 'bonsai-tree-ecosystem',
			image: 'https://cdn.hstatic.net/products/200000968796/p4_4de79927f8ed486fb7b9c1527101c423_large.png',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 2,
			name: 'Rainforest Moss Bowl',
			slug: 'rainforest-moss-bowl',
			image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=500&q=80',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 3,
			name: 'Desert Succulent Oasis',
			slug: 'desert-succulent-oasis',
			image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500&q=80',
			status: false,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 4,
			name: 'Geometric Glass Terrarium',
			slug: 'geometric-glass-terrarium',
			image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=500&q=80',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 5,
			name: 'Fittonia Closed Bottle',
			slug: 'fittonia-closed-bottle',
			image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80',
			status: false,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
	];

	return mockProducts;
};
