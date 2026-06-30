using api.Dtos.Inventory.Response;
using api.Utilities;

namespace api.Repository.Inventory
{
    public interface IGoodsIssueRepository
    {
        Task<GoodsIssueDetailResponse?> GetGoodsIssueDetailAsync(Guid shopId, Guid goodsIssueId, CancellationToken cancellationToken);
        Task<PagedResult<GoodsIssueResponse>> GetGoodsIssuePagingAsync(
            Guid shopId,
            int pageNumber,
            int pageSize,
            CancellationToken cancellationToken = default);
    }
}
