using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Models.Inventory;
using api.Repository.Inventory;
using api.Utilities;

namespace api.Services.Inventory
{
    public class GoodsIssueService (
        IGoodsIssueRepository goodsIssueRepository
        ) : IGoodsIssueService
    {
        public async Task<Result<GoodsIssueDetailResponse>> GetGoodsIssueDetailAsync(Guid shopId, Guid goodsIssueId, CancellationToken cancellationToken = default)
        {
            var result = await goodsIssueRepository.GetGoodsIssueDetailAsync(shopId, goodsIssueId, cancellationToken);

            if (result == null)
            {
                return Result<GoodsIssueDetailResponse>.Failure(Error.Create("Issue.notFound", "", ErrorType.NotFound));
            }

            return Result<GoodsIssueDetailResponse>.Success(result);
        }

        public async Task<Result<PagedResult<GoodsIssueResponse>>> GetGoodsIssuePagingAsync(Guid shopId, PaginationRequestDto pagination, CancellationToken cancellationToken = default)
        {
            var result = await goodsIssueRepository.GetGoodsIssuePagingAsync(shopId, pagination.PageNumber, pagination.PageSize, cancellationToken);

            return Result<PagedResult<GoodsIssueResponse>>.Success(result);
        }
    }
}
