import { PartnerType } from '@/types/inventories/issues/uis/PartnerType';

/**
 * Định nghĩa bảng tra cứu (Mapping) cho các loại đối tác.
 * Sử dụng Record để đảm bảo type-safety, bắt buộc phải định nghĩa đủ các key của PartnerType.
 */
const PARTNER_TYPE_MAP: Record<PartnerType, string> = {
	customer: 'Khách hàng',
	supplier: 'Nhà cung cấp',
	internal: 'Nội bộ',
};

/**
 * Lấy nhãn hiển thị tương ứng với loại đối tác.
 * @param type - Loại đối tác (PartnerType)
 * @param fallback - Giá trị mặc định nếu không tìm thấy (mặc định là 'Đối tác')
 * @returns string - Nhãn tiếng Việt tương ứng
 */
export function getPartnerTypeLabel(type: PartnerType, fallback: string = 'Đối tác'): string {
	const label: string | undefined = PARTNER_TYPE_MAP[type];

	return label ?? fallback;
}

/**
 * Helper để lấy danh sách tất cả labels nếu cần dùng cho Select/Dropdown
 */
export function getAllPartnerTypeOptions(): { value: PartnerType; label: string }[] {
	return Object.entries(PARTNER_TYPE_MAP).map(function ([key, value]) {
		return {
			value: key as PartnerType,
			label: value,
		};
	});
}
