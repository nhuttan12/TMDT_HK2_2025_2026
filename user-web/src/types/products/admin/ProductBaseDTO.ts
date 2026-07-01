import { ProductSystemStatus } from "./variant/ProductSystemStatus";

export interface BaseProduct {
	name: string;
	systemStatus: ProductSystemStatus;
}
