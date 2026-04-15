import { Review } from '@/types/products/user/Review';

export interface ProductDetail {
	id: number;
	name: string;
	brand: string;
	price: number;
	image: string;
	discount: number;
	rating: number;
	description: string;

	reviews: Review[];
}
