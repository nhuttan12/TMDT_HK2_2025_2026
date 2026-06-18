using api.Dtos.Common;
using api.Dtos.Promotiions.Request;
using api.Services.Promotions;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Promotions
{
    [Route("api/admin/promotion")]
    [ApiController]
    public class AdminPromotionController(
        IAdminPromotionService adminPromotionService) : BaseController
    {
        [HttpPost]
        [Authorize(Roles = "Admin, Shop")]
        public async Task<IActionResult> CreatePromotion(
            [FromBody] UpdatePromotion request,
            CancellationToken cancellationToken)
        {
            var result = await adminPromotionService.CreatePromotion(
                request,
                cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("/detail")]
        [Authorize(Roles = "Admin, Shop")]
        public async Task<IActionResult> GetPromotionDetail(
            [FromQuery] Guid promotionId,
            CancellationToken cancellationToken)
        {
            var result = await adminPromotionService.GetPromotionDetail(
                promotionId,
                cancellationToken);

            return HandleResult(result);
        }

        [HttpGet]
        [Authorize(Roles = "Admin, Shop")]
        public async Task<IActionResult> GetPromotionPaging(
            [FromQuery] PaginationRequestDto pagination,
            CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await adminPromotionService.GetPromotionPaging(
                userId.Value,
                pagination,
                cancellationToken);

            return HandleResult(result);
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Shop")]
        public async Task<IActionResult> UpdatePromotion(
            [FromBody] UpdatePromotion request,
            CancellationToken cancellationToken)
        {
            var result = await adminPromotionService.UpdatePromotionAsync(
                request,
                cancellationToken);

            return HandleResult(result);
        }
    }
}
