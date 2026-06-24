using api.Services.Inventory;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Inventory
{
    [Route("api/admin/inventory")]
    [ApiController]
    public class GoodsReceiptController (
        IGoodsReceiptService goodsReceiptService
        ) : BaseController
    {
        [HttpGet]
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
    }
}
