using api.Dtos.Common;
using api.Services.Inventory;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Inventory
{
    [Route("api/admin/issue")]
    [ApiController]
    public class GoodsIssueController (
        IGoodsIssueService goodsIssueService
        ) : BaseController
    {
        [HttpGet("detail")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetGoodsIssueDetailAsync(
            [FromQuery]Guid goodsIssueId,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsIssueService.GetGoodsIssueDetailAsync(shopId.Value, goodsIssueId, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetGoodsIssuePagingAsync(
            [FromQuery] PaginationRequestDto pagination,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await goodsIssueService.GetGoodsIssuePagingAsync(shopId.Value, pagination, cancellationToken);

            return HandleResult(result);
        }
    }
}
