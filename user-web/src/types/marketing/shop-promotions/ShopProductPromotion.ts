export interface ShopProductPromotion {
	id: number;
	productId: number;
	productVariantId: number;
	productName: string;
	createdAt: string;
	updatedAt: string;
	salePrice: number;
	discountPrice: number;
	discount: number;
	status: boolean;
}
