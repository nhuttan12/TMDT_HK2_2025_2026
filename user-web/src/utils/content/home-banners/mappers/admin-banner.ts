import { HomeBanner } from '@/types/contents/home-banners/HomeBanner';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';

/**
 * Chuyển đổi dữ liệu thô của Banner từ Backend sang dạng State của UI
 */
export function mapRawBannerToSortableForm(rawBanner: HomeBanner): SortableImageForm {
	return {
		// Chuyển đổi ID từ Number (DB) sang String (DND Kit yêu cầu)
		localId: rawBanner.id.toString(),

		// Mapping lại tên trường cho khớp với UI Component
		imageUrl: rawBanner.url,
		order: rawBanner.order,
		isPrimary: rawBanner.isPrimary,

		// Gán trạng thái mặc định cho dữ liệu đã có sẵn trên Server
		status: 'done',

		// Cố tình bỏ qua 'file' và 'progress' vì dữ liệu từ server không có 2 trường này
	};
}
