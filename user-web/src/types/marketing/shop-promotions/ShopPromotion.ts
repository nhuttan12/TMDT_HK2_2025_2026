import { TimeArrange } from '@/types/shared/TimeArrange';

export interface ShopPromotion {
	id: string;
	name: string;
	status: boolean;
	arrange: TimeArrange;
	createdAt: string;
	updatedAt: string;
}