using api.Dtos.Common;
using api.Services.Inventory;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Inventory
{
    [Route("api/admin/stock")]
    [ApiController]
    public class GoodsStockController(
         IGoodsStockService goodsStockService
        ) : BaseController
    {
        [HttpGet("summary")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetStockSummaryAsync(
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsStockService.GetStockSummaryAsync(shopId.Value, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("search")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetProductsInStockByVariantNamePagingAsync(
            [FromQuery] String productName,
            [FromQuery] PaginationRequestDto pagination,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsStockService.GetPagedProductsInStockByVariantNameAsync(
                shopId.Value, 
                productName, 
                pagination, 
                cancellationToken);

            return HandleResult(result);
        }

        [HttpGet]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetProductInStockPagingAsync(
            [FromQuery] PaginationRequestDto paginationRequest,
            CancellationToken cancellationToken = default)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsStockService.GetProductInStockPagingAsync(
                shopId.Value,
                paginationRequest,
                cancellationToken);

            return HandleResult(result);
        }
    }
}
