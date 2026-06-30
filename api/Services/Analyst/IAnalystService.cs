using api.Dtos.Analyst.Request;
using api.Dtos.Analyst.Response;
using api.Utilities;

namespace api.Services.Analyst
{
    public interface IAnalystService
    {
        Task<Result<List<RevenueByCategoryResponse>>> GetRevenueByCategoryInMonthAsync(
            Guid shopId,
            int targetMonth,
            CancellationToken cancellationToken = default);

        Task<Result<List<RevenueChartByTimeResponse>>> GetRevenueChartByTimeAsync(
            Guid shopId,
            GetRevenueByDayRequest request,
            CancellationToken cancellationToken = default);
    }
}
