import { ModalStatus } from '@/types/shared/ModalStatus';

export const MODAL_TITLE_MAP: Record<ModalStatus, string> = {
	loading: 'Đang xử lý',
	success: 'Thành công',
	error: 'Thất bại',
	warning: 'Cảnh báo',
	info: 'Thông báo',
};

/**
 * Hàm lấy tiêu đề an toàn cho Status Modal
 * @param status Trạng thái của Modal
 * @returns Tiêu đề hiển thị (Fallback về 'Thông báo' nếu không hợp lệ)
 */
export function getStatusModalTitle(status?: ModalStatus | null): string {
	if (!status) {
		return 'Thông báo';
	}

	return MODAL_TITLE_MAP[status] || 'Thông báo';
}