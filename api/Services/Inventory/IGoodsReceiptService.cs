using api.Dtos.Inventory;
using api.Utilities;

namespace api.Services.Inventory
{
    public interface IGoodsReceiptService
    {
        Task<Result<GoodsReceiptDetailResponse>> GetReceiptDetailAsync(Guid userId, Guid receiptId, CancellationToken cancellationToken);
    }
}
