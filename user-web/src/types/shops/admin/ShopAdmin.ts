import { ShopAdminBase } from "./ShopAdminBase";
import { ShopStatus } from "./ShopStatus";

export interface ShopAdmin extends ShopAdminBase {
	status: ShopStatus;
}
