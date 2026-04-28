import { TimeArrange } from '@/types/shared/TimeArrange';

export interface ShopPromotion {
	id: number;
	name: string;
	status: boolean;
	arrange: TimeArrange;
	createdAt: string;
	updatedAt: string;
}