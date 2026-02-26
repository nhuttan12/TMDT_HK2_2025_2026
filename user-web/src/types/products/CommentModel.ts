import { ShopReply } from '@/types/products/ShopReply';

export interface CommentModel {
	id: string;
	userName: string;
	createdAt: string;
	rating: number;
	content: string;
	shopReply?: ShopReply;
}
