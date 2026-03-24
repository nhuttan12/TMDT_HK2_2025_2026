export function formatDate(dateString: string): string {
	if (!dateString) return '';

	const date = new Date(dateString);

	if (isNaN(date.getTime())) return '';

	return date.toLocaleDateString('vi-VN');
}

export function formatDateForInpu(date: string): string {
	return date ? date.split('T')[0] : '';
}
