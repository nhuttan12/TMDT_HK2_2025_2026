import { ModalStatus } from '@/types/shared/ModalStatus';

export const MODAL_TITLE_MAP: Record<ModalStatus, string> = {
	loading: 'Đang xử lý',
	success: 'Thành công',
	error: 'Thất bại',
	warning: 'Cảnh báo',
	info: 'Thông báo',
};