using api.Dtos.Inventory;

namespace api.Repository.Inventory
{
    public interface IGoodsReceiptRepository
    {
        Task<GoodsReceiptDetailResponse?> GetReceiptDetailAsync(Guid userId, Guid receiptId, CancellationToken cancellationToken);
    }
}
