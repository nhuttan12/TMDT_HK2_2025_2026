using api.Database;
using api.Dtos.Analyst.Request;
using api.Dtos.Analyst.Response;
using api.Models.Enums;
using api.Repository.Analyst;
using api.Utilities;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Analyst
{
    public class AnalystService(
        IAnalystRepository analystRepository,
        MyAppDbContext context
        ) : IAnalystService
    {
        public async Task<Result<List<RevenueByCategoryResponse>>> GetRevenueByCategoryInMonthAsync(Guid shopId, int targetMonth, CancellationToken cancellationToken = default)
        {
            TimeSpan timeZoneOffset = TimeSpan.FromHours(7);
            var nowLocal = DateTimeOffset.UtcNow.ToOffset(timeZoneOffset);

            if (targetMonth < 1 || targetMonth > 12)
            {
                targetMonth = nowLocal.Month;
            }

            int currentYear = nowLocal.Year;
            var startMonth = new DateTime(currentYear, targetMonth, 1);
            var endMonth = startMonth.AddMonths(1);

            var startOffset = new DateTimeOffset(startMonth, timeZoneOffset);
            var endOffset = new DateTimeOffset(endMonth, timeZoneOffset);

            // 2. Lọc & Gom nhóm trực tiếp dưới Database bằng EF Core Navigation Properties
            var categoryRevenues = await context.InvoiceItems
                .AsNoTracking()
                .Include(i => i.Invoice)
                .Include(i => i.Variant)
                .ThenInclude(v => v.Product)
                .ThenInclude(p => p.Category)
                .Where(ii => ii.Invoice.ShopId == shopId
                          && ii.Invoice.CreatedAt >= startOffset
                          && ii.Invoice.CreatedAt < endOffset
                          && ii.Invoice.Status == InvoiceStatus.Completed) // 3 = Completed
                .GroupBy(ii => ii.Variant.Product.Category.Name) // Tự động dịch sang INNER JOIN và GROUP BY
                .Select(g => new
                {
                    CategoryName = g.Key,
                    Revenue = g.Sum(ii => ii.Quantity * ii.PriceAtPurchase)
                })
                .ToListAsync(cancellationToken);

            // 3. Tính toán phần trăm trên RAM (Tối ưu Database)
            decimal totalRevenue = categoryRevenues.Sum(c => c.Revenue);

            var result = categoryRevenues
                .Select(c => new RevenueByCategoryResponse
                {
                    CategoryName = c.CategoryName ?? "Không xác định",
                    Revenue = c.Revenue,
                    Percentage = totalRevenue > 0 ? (double)(c.Revenue / totalRevenue) * 100 : 0
                })
                .OrderByDescending(c => c.Revenue) // Đẩy doanh thu cao nhất lên đầu
                .ToList();

            return result;
        }

        public async Task<Result<List<RevenueChartByTimeResponse>>> GetRevenueChartByTimeAsync(Guid shopId, GetRevenueByDayRequest request, CancellationToken cancellationToken = default)
        {
            var result = await analystRepository.GetRevenueChartByTimeAsync(shopId, request.StartDate, request.EndDate, cancellationToken);

            return Result<List<RevenueChartByTimeResponse>>.Success(result);
        }
    }
}
