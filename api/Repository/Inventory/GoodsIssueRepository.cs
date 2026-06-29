using api.Dtos.Inventory.Response;
using api.Utilities;
using AutoMapper;
using Microsoft.Data.SqlClient;

namespace api.Repository.Inventory
{
    public class GoodsIssueRepository (
        IStoredProcedureRepository storedProcedureRepository,
        IMapper mapper
        ) : IGoodsIssueRepository
    {
        public async Task<GoodsIssueDetailResponse?> GetGoodsIssueDetailAsync(Guid shopId, Guid goodsIssueId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId),
                new SqlParameter("@GoodsIssueId", goodsIssueId)
            };

            return await storedProcedureRepository.QueryMultipleAsync<GoodsIssueDetailResponse?>(
                "usp_GetGoodsIssueDetailByGoodsIssueId",
                async (reader) =>
                {
                    // 1. Đọc Result Set đầu tiên (Master)
                    var detail = await reader.ReadFirstOrDefaultAsync<GoodsIssueDetailResponse>();

                    if (detail != null)
                    {
                        // 2. Đọc Result Set thứ hai (Danh sách Items)
                        var items = await reader.ReadAsync<GoodsIssueItemResponse>();

                        // 3. Lồng (Nest) mảng items vào object cha
                        detail.Items = items.ToList();
                    }

                    return detail;
                },
                cancellationToken,
                parameters
            );
        }

        public async Task<PagedResult<GoodsIssueResponse>> GetGoodsIssuePagingAsync(Guid shopId, int pageNumber, int pageSize, CancellationToken cancellationToken = default)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId),
                new SqlParameter("@PageNumber", pageNumber),
                new SqlParameter("@PageSize", pageSize)
            };

            // 1. Gọi hàm QueryAsync để lấy danh sách
            var rawGoodsIssues = await storedProcedureRepository.QueryAsync<RawGoodsIssue>(
                "usp_GetGoodsIssuePaging",
                cancellationToken,
                parameters
            );

            // 2. Lấy TotalItems từ dòng đầu tiên (nếu danh sách rỗng thì = 0)
            int totalCount = rawGoodsIssues.FirstOrDefault()?.TotalItems ?? 0;

            var result = mapper.Map<List<GoodsIssueResponse>>(rawGoodsIssues);

            // 3. Đóng gói vào wrapper phân trang chuẩn
            return new PagedResult<GoodsIssueResponse>(result, totalCount, pageNumber, pageSize);
        }
    }
}
