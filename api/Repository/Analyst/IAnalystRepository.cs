using api.Dtos.Analyst.Response;

namespace api.Repository.Analyst
{
    public interface IAnalystRepository
    {
        Task<List<RevenueByCategoryResponse>> GetRevenueByCategoryInMonthAsync(
            Guid shopId,
            int targetMonth,
            CancellationToken cancellationToken = default);

        Task<List<RevenueChartByTimeResponse>> GetRevenueChartByTimeAsync(
            Guid shopId,
            DateTime startDate,
            DateTime endDate,
            CancellationToken cancellationToken = default);
    }
}
