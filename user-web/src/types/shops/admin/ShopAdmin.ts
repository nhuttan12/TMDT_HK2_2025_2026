import { ShopStatus } from "./ShopStatus";

export interface ShopAdmin {
	id: number;
	name: string;
	email: string;
	phone: string;
	status: ShopStatus;
	rating: number;
	createdAt: string;
}
