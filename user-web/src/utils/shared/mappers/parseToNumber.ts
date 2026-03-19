import { NumericString } from '@/types/shared/NumericString';

export function parseToNumber(input: number | NumericString): number {
	return typeof input === 'number' ? input : Number(input);
}