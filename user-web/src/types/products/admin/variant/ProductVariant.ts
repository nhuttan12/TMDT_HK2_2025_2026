export interface ProductVariant {
	id: number;
	productID: number;

	name: string; // optional, fallback display
	sku: string;

    quantity: number;

	salePrice: number;
	costPrice: number; // Giá nhập

	image?: string;
}