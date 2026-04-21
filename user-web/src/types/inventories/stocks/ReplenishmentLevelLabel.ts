import { ReplenishmentLevel } from '@/types/inventories/stocks/ReplenishmentLevel';

const REPLENISHMENT_LABEL_MAP: Record<ReplenishmentLevel, string> = {
	immediate: 'Bổ sung hàng ngay lập tức',
	early: 'Bổ sung hàng sớm',
	normal: 'Bình thường',
};

export const getReplenishmentLabel = (level: ReplenishmentLevel): string => {
	return REPLENISHMENT_LABEL_MAP[level] || 'Không xác định';
};
