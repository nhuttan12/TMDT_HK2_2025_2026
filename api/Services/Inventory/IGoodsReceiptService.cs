using api.Dtos.Inventory.Requests;
using api.Dtos.Inventory.Response;
using api.Utilities;

namespace api.Services.Inventory
{
    public interface IGoodsReceiptService
    {
        Task<Result<GoodsReceiptDetailResponse>> GetReceiptDetailAsync(Guid userId, Guid receiptId, CancellationToken cancellationToken);
        Task<Result<Guid>> CreateGoodsReceiptAsync(Guid shopId, CreateGoodsReceiptRequest request, CancellationToken cancellationToken);
    }
}
