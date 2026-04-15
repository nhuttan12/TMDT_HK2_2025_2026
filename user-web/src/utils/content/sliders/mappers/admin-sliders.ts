import { ShopSlider } from '@/types/shops/ShopSlider';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';

export function mapSliderToSortableForm(raw: ShopSlider): SortableImageForm {
	return {
		localId: raw.id.toString(),
		imageUrl: raw.url,
		order: raw.order,
		isPrimary: raw.isPrimary,
		status: 'done',
	};
}
