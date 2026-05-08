import { ShopAdmin } from './ShopAdmin';
import { ApprovalShopsStatus } from './ApprovalShopsStatus';

// Kế thừa toàn bộ ShopAdmin, TRỪ field status. Sau đó định nghĩa lại status mới.
export interface ShopApproval extends Omit<ShopAdmin, 'status'> {
	status: ApprovalShopsStatus;
}
