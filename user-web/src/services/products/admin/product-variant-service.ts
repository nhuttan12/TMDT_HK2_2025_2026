import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';

export async function getProductVariantDetailById(id: number): Promise<ProductVariantDetail> {
	// Giả lập độ trễ mạng
	return new Promise<ProductVariantDetail>((resolve) => {
		setTimeout(() => {
			resolve({
				id: id,
				productId: 101,
				name: 'Bể Terrarium Trụ Tròn Size M',
				sku: 'TERRA-CYL-M',
				attributes: [{ size: '20cm x 20cm x 30cm' }],
				status: 'active',
				pricing: {
					salePrice: 550000,
					costPrice: 350000,
				},
				supplierName: 'Xưởng Thủy Tinh GreenLife',
				inventory: {
					available: 50,
					reserved: 5,
					incoming: 10,
				},
				shipping: {
					weightInGram: 1500, // Bể kính khá nặng
					dimensionsInCm: {
						length: 25,
						width: 25,
						height: 35,
					},
				},
				images: [
					{
						localId: 'img-1',
						imageUrl:
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lijlGUc-rWzrpMjhX9xnmiOuAeBnpN5L6Q&s',
						isPrimary: true,
						order: 0,
						status: 'done',
					},
					{
						localId: 'img-2',
						imageUrl:
							'https://bizweb.dktcdn.net/100/181/287/files/wonder1.jpg?v=1701920670951',
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
