import { PartnerType } from '@/types/inventories/issues/uis/PartnerType';

export interface GoodsIssuePartner {
	id: number;
	name: string;
	type: PartnerType;
	phoneNumber?: string;
	address?: string;
}