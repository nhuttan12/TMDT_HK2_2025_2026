import { ApprovalShopsStatus } from './ApprovalShopsStatus';
import { ShopAdminBase } from './ShopAdminBase';

// Kế thừa toàn bộ ShopAdmin, TRỪ field status. Sau đó định nghĩa lại status mới.
export interface ShopApproval extends ShopAdminBase {
	status: ApprovalShopsStatus;
}
