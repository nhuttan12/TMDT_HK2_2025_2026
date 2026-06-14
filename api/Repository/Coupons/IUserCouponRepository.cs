using api.Dtos.Common;
using api.Dtos.Coupons.Request;
using api.Dtos.Coupons.Response;
using api.Utilities;

namespace api.Repository.Coupons
{
    public interface IUserCouponRepository
    {
        Task<List<UserCoupon>> GetPlatformCouponForUserSaving(Guid? userId, CancellationToken cancellationToken);
        Task<List<UserCoupon>> GetShopCouponForUserSaving(Guid? userId, Guid shopId, CancellationToken cancellationToken);
    }
}
