export interface ProductVariantAdmin {
	id: string;
	productId: string;

	name: string; // optional, fallback display
	sku: string;

    quantity: number;

	salePrice: number;
	costPrice: number; // Giá nhập

	image?: string;
}