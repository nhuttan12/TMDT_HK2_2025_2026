import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';

export async function getProductVariantDetailById(id: number): Promise<ProductVariantDetail> {
	// Giả lập độ trễ mạng
	return new Promise<ProductVariantDetail>((resolve) => {
		setTimeout(() => {
			resolve({
				id: id,
				productId: 101,
				name: 'Áo thun đen M',
				sku: 'TS-BLACK-M',
				attributes: [{ size: 'M', color: 'Đen' }],
				status: 'active',
				pricing: {
					salePrice: 100000,
					costPrice: 70000,
				},
				supplierName: 'Công ty ABC',
				inventory: {
					available: 50,
					reserved: 5,
					incoming: 10,
				},
				shipping: {
					weightInGram: 200,
					dimensionsInCm: {
						length: 30,
						width: 20,
						height: 2,
					},
				},
				images: [
					{
						localId: 'img-1',
						imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
						isPrimary: true,
						order: 0,
						status: 'done',
					},
					{
						localId: 'img-2',
						imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
						isPrimary: false,
						order: 1,
						status: 'done',
					},
				],
				systemStatus: 'approved',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});
		}, 500);
	});
}
