using api.Dtos.Common;
using api.Dtos.Inventory.Requests;
using api.Services.Inventory;
using api.Utilities;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace api.Controllers.Inventory
{
    [Route("api/admin/receipt")]
    [ApiController]
    public class GoodsReceiptController(
        IGoodsReceiptService goodsReceiptService
        ) : BaseController
    {
        [HttpGet("detail")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetReceiptDetailAsync(
            [FromQuery] Guid receiptId,
            CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsReceiptService.GetReceiptDetailAsync(
                userId.Value,
                receiptId,
                cancellationToken);

            return HandleResult(result);
        }

        [HttpPost]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> CreateGoodsReceipt(
            [FromBody] CreateGoodsReceiptRequest request,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsReceiptService.CreateGoodsReceiptAsync(shopId.Value, request, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetGoodsReceiptsPagingAsync(
            [FromQuery] PaginationRequestDto request,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsReceiptService.GetGoodsReceiptsPagingAsync(shopId.Value, request, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("search")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetGoodsReceiptsByCodePagingAsync(
            [FromQuery] PaginationRequestDto request,
            [FromQuery] String code,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsReceiptService.GetGoodsReceiptsByCodePagingAsync(shopId.Value, code, request, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("batch/products")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetProductListInBatchPagingAsync(
            [FromQuery] GetProductListInBatchRequest request,
            [FromQuery] PaginationRequestDto pagination,
            CancellationToken cancellationToken)
        {
            var result = await goodsReceiptService.GetProductListInBatchPagingAsync(request, pagination, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("product-selection")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetProductSelectionForGoodsReceiptAsync(
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsReceiptService.GetProductSelectionForGoodsReceiptAsync(shopId.Value, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("variant-selection")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetProductVariantSelectionAsync(
            [FromQuery] Guid productId,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsReceiptService.GetProductVariantSelectionAsync(shopId.Value, productId, cancellationToken);

            return HandleResult(result);
        }
    }
}
