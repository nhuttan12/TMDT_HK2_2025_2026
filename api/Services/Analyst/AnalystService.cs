using api.Dtos.Analyst.Request;
using api.Dtos.Analyst.Response;
using api.Repository.Analyst;
using api.Utilities;

namespace api.Services.Analyst
{
    public class AnalystService(
        IAnalystRepository analystRepository
        ) : IAnalystService
    {
        public async Task<Result<List<RevenueByCategoryResponse>>> GetRevenueByCategoryInMonthAsync(Guid shopId, int targetMonth, CancellationToken cancellationToken = default)
        {
            var result = await analystRepository.GetRevenueByCategoryInMonthAsync(shopId, targetMonth, cancellationToken);

            return Result<List<RevenueByCategoryResponse>>.Success(result);
        }

        public async Task<Result<List<RevenueChartByTimeResponse>>> GetRevenueChartByTimeAsync(Guid shopId, GetRevenueByDayRequest request, CancellationToken cancellationToken = default)
        {
            var result = await analystRepository.GetRevenueChartByTimeAsync(shopId, request.StartDate, request.EndDate, cancellationToken);

            return Result<List<RevenueChartByTimeResponse>>.Success(result);
        }
    }
}
