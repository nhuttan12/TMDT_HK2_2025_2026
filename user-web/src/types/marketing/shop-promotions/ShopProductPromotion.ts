export interface ShopProductPromotion {
	id: number;
	productId: number;
	productVariantId: number;
	productName: string;
	createdAt: string;
	updatedAt: string;
	promotionPrice: number;
	discount: number;
	status: boolean;
}
