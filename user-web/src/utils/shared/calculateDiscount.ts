export const calculateDiscount = (sale: number, importP: number): number => {
	if (sale <= 0) return 0;
	if (importP >= sale) return 0;

	return Math.round(((sale - importP) / sale) * 100);
};