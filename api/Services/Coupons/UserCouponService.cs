using api.Dtos.Common;
using api.Dtos.Coupons.Response;
using api.Models;
using api.Models.Coupons;
using api.Models.Shops;
using api.Repository.Coupons;
using api.Utilities;
using static Azure.Core.HttpHeader;

namespace api.Services.Coupons
{
    public class UserCouponService(
        IUserCouponRepository couponRepository
        ) : IUserCouponService
    {
        public async Task<Result<Guid>> ClaimCoupon(Guid userId, Guid couponId, CancellationToken cancellationToken)
        {
            var coupon = await couponRepository.ClaimCoupon(userId, couponId, cancellationToken);

            return Result<Guid>.Success(coupon);
        }

        public async Task<Result<List<UserCoupon>>> GetPlatformCouponForUserSaving(Guid? userId, CancellationToken cancellationToken)
        {
            var coupon = await couponRepository.GetPlatformCouponForUserSaving(userId, cancellationToken);

            return Result<List<UserCoupon>>.Success(coupon);
        }

        public async Task<Result<List<UserCoupon>>> GetShopCouponForUserSaving(Guid? userId, Guid shopId, CancellationToken cancellation)
        {
            var coupon = await couponRepository.GetShopCouponForUserSaving(userId, shopId, cancellation);

            return Result<List<UserCoupon>>.Success(coupon);
        }

        public async Task<Result<PagedResult<UserCoupon>>> GetUserSavedCouponListPaging(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var coupon = await couponRepository.GetUserSavedCouponListPaging(
                userId, 
                pagination, 
                cancellationToken);

            return Result<PagedResult<UserCoupon>>.Success(coupon);
        }
    }
}
