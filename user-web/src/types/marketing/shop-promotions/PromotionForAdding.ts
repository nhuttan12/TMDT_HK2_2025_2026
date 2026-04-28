import { TimeArrange } from '@/types/shared/TimeArrange';
import { ProductPromotionForAdding } from '@/types/marketing/shop-promotions/ProductPromotionForAdding';

export interface PromotionForAdding {
	promotionName: string;
	arrange: TimeArrange;
	status: boolean;
	products: ProductPromotionForAdding[];
}
