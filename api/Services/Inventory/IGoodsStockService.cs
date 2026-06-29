using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Utilities;

namespace api.Services.Inventory
{
    public interface IGoodsStockService
    {
        Task<Result<GoodsStockSummaryDto>> GetStockSummaryAsync(Guid shopId, CancellationToken cancellationToken);
        Task<Result<PagedResult<ProductInStockDtoResponse>>> GetPagedProductsInStockByVariantNameAsync(
            Guid shopId,
            string? productName,
            PaginationRequestDto request,
            CancellationToken cancellationToken);
        Task<Result<PagedResult<ProductInStockDtoResponse>>> GetProductInStockPagingAsync(
            Guid shopId,
            PaginationRequestDto pagination,
            CancellationToken cancellationToken = default);
    }
}
