using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Services.Inventory;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Inventory
{
    [Route("api/admin/supplier")]
    [ApiController]
    public class GoodsSupplierController(
        IGoodsSupplierService goodsSupplierService
        ) : BaseController
    {
        [HttpPost]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> CreateSupplierAsync(
            [FromBody] CreateSupplierRequestDto request,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsSupplierService.CreateSupplierAsync(shopId.Value, request, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("detail")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetSupplierDetail(
            [FromQuery] Guid supplierId,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsSupplierService.GetSupplierDetailAsync(shopId.Value, supplierId, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetSupplierListPaging(
            [FromQuery] PaginationRequestDto pagination,
            CancellationToken cancellationToken = default)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsSupplierService.GetSupplierListPagingAsync(shopId.Value, pagination, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("drop-down")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetSupplierOptions(
            CancellationToken cancellationToken = default)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsSupplierService.GetSupplierOptionsAsync(shopId.Value, cancellationToken);

            return HandleResult(result);
        }
    }
}
