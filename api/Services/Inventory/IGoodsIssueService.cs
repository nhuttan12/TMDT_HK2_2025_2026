using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Utilities;

namespace api.Services.Inventory
{
    public interface IGoodsIssueService
    {
        Task<Result<GoodsIssueDetailResponse>> GetGoodsIssueDetailAsync(Guid shopId, Guid goodsIssueId, CancellationToken cancellationToken = default);
        Task<Result<PagedResult<GoodsIssueResponse>>> GetGoodsIssuePagingAsync(
            Guid shopId,
            PaginationRequestDto pagination,
            CancellationToken cancellationToken = default);
    }
}
