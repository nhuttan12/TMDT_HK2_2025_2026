import { ProductSystemStatus } from "./variant/ProductSystemStatus";

export interface BaseProduct {
	name: string;
	status: boolean;
	systemStatus: ProductSystemStatus;
}
