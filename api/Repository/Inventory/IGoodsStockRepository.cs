using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Utilities;

namespace api.Repository.Inventory
{
    public interface IGoodsStockRepository
    {
        Task<GoodsStockSummaryDto> GetStockSummaryAsync(Guid shopId, CancellationToken cancellationToken);
        Task<PagedResult<ProductInStockDtoResponse>> GetPagedProductsInStockByVariantNameAsync(
            Guid shopId,
            string? productName,
            PaginationRequestDto request,
            CancellationToken cancellationToken);
        Task<PagedResult<ProductInStockDtoResponse>> GetPagedRawProductInStockAsync(
            Guid shopId,
            PaginationRequestDto pagination,
            CancellationToken cancellationToken);
    }
}
