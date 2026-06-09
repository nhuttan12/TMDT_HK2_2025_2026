import { PartnerType } from '@/types/inventories/issues/uis/PartnerType';

export interface GoodsIssuePartner {
	id: string;
	name: string;
	type: PartnerType;
	phoneNumber?: string;
	address?: string;
}