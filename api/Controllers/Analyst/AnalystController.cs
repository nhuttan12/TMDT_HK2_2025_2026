using api.Dtos.Analyst.Request;
using api.Services.Analyst;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Analyst
{
    [Route("api/admin/analyst")]
    [ApiController]
    public class AnalystController (
        IAnalystService analystService
        ) : BaseController
    {
        [HttpGet("category-revenue")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetRevenueByCategoryInMonthAsync(
            [FromQuery] int targetMonth,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await analystService.GetRevenueByCategoryInMonthAsync(shopId.Value, targetMonth, cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("revenue-by-time")]
        [Authorize(Roles = "Shop")]
        public async Task<IActionResult> GetRevenueChartByTimeAsync(
            [FromQuery] GetRevenueByDayRequest request,
            CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;

            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await analystService.GetRevenueChartByTimeAsync(shopId.Value, request, cancellationToken);

            return HandleResult(result);
        }
    }
}
