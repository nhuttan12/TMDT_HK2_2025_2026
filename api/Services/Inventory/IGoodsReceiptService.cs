using api.Dtos.Common;
using api.Dtos.Inventory.Requests;
using api.Dtos.Inventory.Response;
using api.Utilities;

namespace api.Services.Inventory
{
    public interface IGoodsReceiptService
    {
        Task<Result<GoodsReceiptDetailResponse>> GetReceiptDetailAsync(Guid userId, Guid receiptId, CancellationToken cancellationToken);
        Task<Result<Guid>> CreateGoodsReceiptAsync(Guid shopId, CreateGoodsReceiptRequest request, CancellationToken cancellationToken);
        Task<Result<PagedResult<GoodsReceiptPagingDtoResponse>>> GetGoodsReceiptsPagingAsync(Guid shopId, PaginationRequestDto request, CancellationToken cancellationToken);
        Task<Result<PagedResult<GoodsReceiptPagingDtoResponse>>> GetGoodsReceiptsByCodePagingAsync(Guid shopId, string code, PaginationRequestDto request, CancellationToken cancellationToken);
        Task<Result<PagedResult<ProductBatchPagingDtoResponse>>> GetProductListInBatchPagingAsync(GetProductListInBatchRequest request, PaginationRequestDto pagination, CancellationToken cancellationToken);
        Task<Result<IEnumerable<ProductSelectionResponse>>> GetProductSelectionForGoodsReceiptAsync(Guid shopId, CancellationToken cancellationToken = default);
    }
}
