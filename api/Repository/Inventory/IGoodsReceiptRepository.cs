using api.Dtos.Common;
using api.Dtos.Inventory.Requests;
using api.Dtos.Inventory.Response;
using api.Utilities;

namespace api.Repository.Inventory
{
    public interface IGoodsReceiptRepository
    {
        Task<GoodsReceiptDetailResponse?> GetReceiptDetailAsync(Guid userId, Guid receiptId, CancellationToken cancellationToken);
        Task<Guid> CreateGoodsReceiptAsync(Guid shopId, CreateGoodsReceiptRequest request, CancellationToken cancellationToken);
        Task<PagedResult<GoodsReceiptPagingDtoResponse>> GetGoodsReceiptsPagingAsync(Guid shopId, PaginationRequestDto request, CancellationToken cancellationToken);
        Task<PagedResult<GoodsReceiptPagingDtoResponse>> GetGoodsReceiptsByCodePagingAsync(Guid shopId, string code, PaginationRequestDto request, CancellationToken cancellationToken);
        Task<PagedResult<ProductBatchPagingDtoResponse>> GetProductListInBatchPagingAsync(GetProductListInBatchRequest request, PaginationRequestDto pagination, CancellationToken cancellationToken);
        Task<IEnumerable<ProductSelectionResponse>> GetProductSelectionForGoodsReceiptAsync(Guid shopId, CancellationToken cancellationToken = default);
    }
}
