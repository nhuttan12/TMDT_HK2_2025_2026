using api.Dtos.Common;
using api.Dtos.Coupons.Response;
using api.Services.Coupons;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Coupons
{
    [Route("api/coupon")]
    [ApiController]
    public class CouponUserController (
        IUserCouponService couponService) : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetPlatformCouponForUserSaving(
            CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            var result = await couponService.GetPlatformCouponForUserSaving(userId, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet]
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
    }
}
