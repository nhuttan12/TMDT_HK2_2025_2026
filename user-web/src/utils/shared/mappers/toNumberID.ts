import { NumericString } from '@/types/shared/NumericString';

export function toNumberID(id: number | NumericString): number {
	return typeof id === 'number' ? id : Number(id);
}