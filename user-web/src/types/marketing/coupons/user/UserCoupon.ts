import { BaseCoupon } from "../BaseCoupon";
import { UserSavedStatus } from "../UserSavedStatus";

export interface UserCoupon extends BaseCoupon {
    // Trạng thái cá nhân hóa của user đang đăng nhập
    userSavedStatus: UserSavedStatus;
}