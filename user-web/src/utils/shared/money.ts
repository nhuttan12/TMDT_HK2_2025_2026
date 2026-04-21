/**
 * Chuyển đổi số tiền thành định dạng tiền tệ Việt Nam Đồng (VNĐ).
 * * @param {number} amount - Số tiền cần định dạng (VD: 10400000).
 * @returns {string} Chuỗi đã được định dạng kèm ký hiệu '₫' (VD: "10.400.000 ₫").
 */
export function formatMoney(amount: number): string {
	return `${amount.toLocaleString('vi-VN')} ₫`;
}
