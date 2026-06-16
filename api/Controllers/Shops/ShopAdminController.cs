using api.Dtos.Common;
using api.Models.Shops;
using api.Services.Shops;
using api.Utilities;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Shops
{
    [Route("api/admin/shop")]
    [ApiController]
    public class ShopAdminController (
        IShopAdminService shopAdminService
        ) : BaseController
    {
        [HttpPost("/approve")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ApproveShop(
            [FromBody] Guid shopId,
            CancellationToken cancellationToken)
        {
            var result = await shopAdminService.ApproveShop(shopId, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("/approval-list")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetShopApprovalList(
            [FromQuery] PaginationRequestDto request,
            CancellationToken cancellationToken)
        {
            var result = await shopAdminService.GetShopApprovalList(request, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("/detail")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetShopDetailInfo(
            [FromQuery] Guid shopId,
            CancellationToken cancellationToken)
        {
            var result = await shopAdminService.GetShopDetailInfo(shopId, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetShopList(
            [FromQuery] PaginationRequestDto request,
            CancellationToken cancellationToken)
        {
            var result = await shopAdminService.GetShopList(request, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("/profile")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetShopProfile(CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await shopAdminService.GetShopProfile(userId.Value, cancellationToken);

            return HandleResult(result);
        }
    }
}
