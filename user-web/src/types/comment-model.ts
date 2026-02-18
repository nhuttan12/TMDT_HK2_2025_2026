import { ShopReply } from '@/types/shop-reply';

export interface CommentModel {
	id: string;
	userName: string;
	createdAt: string;
	rating: number;
	content: string;
	shopReply?: ShopReply;
}
