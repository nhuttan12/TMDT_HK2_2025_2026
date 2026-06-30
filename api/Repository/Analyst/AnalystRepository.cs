using api.Dtos.Analyst.Response;
using Microsoft.Data.SqlClient;

namespace api.Repository.Analyst
{
    public class AnalystRepository (
        IStoredProcedureRepository storedProcedureRepository
        ) : IAnalystRepository
    {
        public async Task<List<RevenueByCategoryResponse>> GetRevenueByCategoryInMonthAsync(Guid shopId, int targetMonth, CancellationToken cancellationToken = default)
        {
            var parameters = new[]
            {
                new SqlParameter("@ShopId", shopId),
                new SqlParameter("@TargetMonth", targetMonth)
            };

            return await storedProcedureRepository.QueryAsync<RevenueByCategoryResponse>(
                "usp_GetRevenueByProductCategoryInMonth",
                cancellationToken,
                parameters);
        }

        public async Task<List<RevenueChartByTimeResponse>> GetRevenueChartByTimeAsync(Guid shopId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
        {
            var parameters = new[]
            {
                new SqlParameter("@ShopId", shopId),
                new SqlParameter("@StartDate", startDate),
                new SqlParameter("@EndDate", endDate)
            };

            return await storedProcedureRepository.QueryAsync<RevenueChartByTimeResponse>(
                "usp_GetRevenueChartByTime",
                cancellationToken,
                parameters);
        }
    }
}
