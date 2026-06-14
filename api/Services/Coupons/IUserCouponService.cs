using api.Dtos.Common;
using api.Dtos.Coupons.Request;
using api.Dtos.Coupons.Response;
using api.Utilities;

namespace api.Services.Coupons
{
    public interface IUserCouponService
    {
        Task<Result<List<UserCoupon>>> GetPlatformCouponForUserSaving(Guid? userId, CancellationToken cancellationToken);
        Task<Result<List<UserCoupon>>> GetShopCouponForUserSaving(Guid? userId, Guid shopId, CancellationToken cancellation);
    }
}
