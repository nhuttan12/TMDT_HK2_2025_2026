export interface ShopProductPromotion {
	id: string;
	productId: string;
	productVariantId: string;
	productName: string;
	createdAt: string;
	updatedAt: string;
	salePrice: number;
	discountPrice: number;
	discount: number;
	status: boolean;
}
