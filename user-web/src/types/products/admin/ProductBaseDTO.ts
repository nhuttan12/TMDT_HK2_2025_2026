import { ProductSystemStatus } from "./variant/ProductSystemStatus";

export interface BaseProduct {
	name: string;
	slug: string;
	status: boolean;
	systemStatus: ProductSystemStatus;
}
