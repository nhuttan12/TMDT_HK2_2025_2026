import { ShopReply } from '@/types/products/user/ShopReply';

export interface CommentModel {
	commentID: string;
	userName: string;
	createdAt: string;
	rating: number;
	content: string;
	shopReply?: ShopReply;
}
