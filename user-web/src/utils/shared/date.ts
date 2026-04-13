export function formatDate(dateString: string): string {
	if (!dateString) return '';

	const date = new Date(dateString);

	if (isNaN(date.getTime())) return '';

	return date.toLocaleDateString('vi-VN');
}

export function formatDateForInput(date: string): string {
	return date ? date.split('T')[0] : '';
}

/**
 * Chuyển đổi chuỗi ISO thành định dạng 'YYYY-MM-DD [HH:mm]'
 * Ví dụ: '2026-03-21T08:30:00.000Z' -> '2026-03-21 [08:30]'
 */
export function formatDateTimeWithBrackets(isoString: string): string {
	const date = new Date(isoString);

	// Fallback nếu chuỗi ngày tháng không hợp lệ
	if (isNaN(date.getTime())) return 'N/A';

	const year: number = date.getFullYear();
	// getMonth() trả về từ 0-11 nên cần + 1, padStart để thêm số 0 đằng trước nếu < 10
	const month: string = String(date.getMonth() + 1).padStart(2, '0');
	const day: string = String(date.getDate()).padStart(2, '0');

	const hours: string = String(date.getHours()).padStart(2, '0');
	const minutes: string = String(date.getMinutes()).padStart(2, '0');

	return `${year}-${month}-${day} [${hours}:${minutes}]`;
}
