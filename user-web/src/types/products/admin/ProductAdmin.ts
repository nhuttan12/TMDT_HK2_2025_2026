export interface ProductAdmin {
	productID: number;
	name: string;
	slug: string;
	image: string;
	price: number;
	stock: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}