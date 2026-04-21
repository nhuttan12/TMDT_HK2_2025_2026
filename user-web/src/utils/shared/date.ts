/**
 * Chuyển đổi chuỗi thời gian thành định dạng ngày tháng cục bộ của Việt Nam (DD/MM/YYYY).
 * Hàm có tích hợp cơ chế an toàn: kiểm tra chuỗi rỗng và dữ liệu không hợp lệ (Invalid Date).
 *
 * @param {string} dateString - Chuỗi thời gian đầu vào (VD: "2026-04-15T18:19:32Z").
 * @returns {string} Chuỗi ngày tháng đã định dạng (VD: "15/4/2026"), hoặc chuỗi rỗng nếu đầu vào sai.
 */
export function formatDate(dateString: string): string {
	if (!dateString) return '';

	const date = new Date(dateString);

	// Kiểm tra tính hợp lệ để tránh lỗi runtime trả ra chữ "Invalid Date" trên UI
	if (isNaN(date.getTime())) return '';

	return date.toLocaleDateString('vi-VN');
}

/**
 * Trích xuất phần ngày (YYYY-MM-DD) từ chuỗi thời gian định dạng chuẩn ISO 8601.
 * Thường được sử dụng chuyên biệt để binding (gắn) dữ liệu mặc định vào thẻ HTML <input type="date" />.
 *
 * @param {string} date - Chuỗi thời gian chuẩn ISO (VD: "2026-04-15T18:19:32.000Z").
 * @returns {string} Chuỗi chỉ chứa ngày theo định dạng YYYY-MM-DD (VD: "2026-04-15"), hoặc chuỗi rỗng nếu không có đầu vào.
 */
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
