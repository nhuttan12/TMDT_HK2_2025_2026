import { ShopReply } from '@/types/products/user/ShopReply';

export interface Review {
	id: string;
	userName: string;
	createdAt: string;
	rating: number;
	content: string;
	shopReply?: ShopReply;
}
