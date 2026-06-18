using api.Dtos.Common;
using api.Dtos.Coupons.Request;
using api.Models.Coupons;
using api.Services.Coupons;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Coupons
{
    [Route("api/admin/coupon")]
    [ApiController]
    public class CouponAdminController(
        IAdminCouponService couponService) : BaseController
    {
        [HttpPost]
        [Authorize(Roles = "Shop, Admin")]
        public async Task<IActionResult> CreateCouponAsync(
            [FromBody] CreateCouponRequest request,
            CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await couponService.CreateCouponAsync(
                userId.Value,
                cancellationToken,
                request);

            return HandleResult(result);
        }

        [HttpGet("/detail")]
        [Authorize(Roles = "Shop, Admin")]
        public async Task<IActionResult> GetShopCouponDetailAsync(
        [FromQuery] Guid couponId,
        CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await couponService.GetCouponDetailAsync(
                userId.Value,
                couponId,
                cancellationToken);

            return HandleResult(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAdminCouponPagingAsync(
            [FromQuery] PaginationRequestDto pagination,
            CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await couponService.GetAdminCouponPagingAsync(
                userId.Value,
                pagination,
                cancellationToken);

            return HandleResult(result);
        }
    }
}
