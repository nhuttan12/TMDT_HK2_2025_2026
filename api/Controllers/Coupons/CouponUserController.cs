using api.Dtos.Common;
using api.Services.Coupons;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Coupons
{
    [Route("api/coupon")]
    [ApiController]
    public class CouponUserController (
        IUserCouponService couponService) : BaseController
    {
        [HttpGet("platform")]
        public async Task<IActionResult> GetPlatformCouponForUserSaving(
            CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            var result = await couponService.GetPlatformCouponForUserSaving(userId, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("shop")]
        public async Task<IActionResult> GetShopCouponForUserSaving(
            [FromQuery] Guid shopId,
            CancellationToken cancellation)
        {
            var userId = AuthenticatedUserId;

            var result = await couponService.GetShopCouponForUserSaving(
                userId, 
                shopId,
                cancellation);

            return HandleResult(result);
        }

        [HttpGet("saved")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserSavedCouponListPaging(
            [FromQuery] PaginationRequestDto pagination,
            CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await couponService.GetUserSavedCouponListPaging(
                userId.Value,
                pagination,
                cancellationToken);

            return HandleResult(result);
        }

        [HttpPost("claim")]
        public async Task<IActionResult> ClaimCoupon(
            [FromBody] Guid couponId,
            CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await couponService.ClaimCoupon(
                userId.Value,
                couponId,
                cancellationToken);

            return HandleResult(result);
        }
    }
}
