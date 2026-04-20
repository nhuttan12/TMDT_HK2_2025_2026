import { ShopBanner } from '@/types/shops/ShopBanner';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';

export function mapShopBannersToSortableForm(raw: ShopBanner): SortableImageForm {
	return {
		localId: raw.id.toString(),
		imageUrl: raw.url,
		order: raw.order,
		isPrimary: raw.isPrimary,
		status: 'done',
	};
}
