using api.Dtos.Inventory.Requests;
using api.Dtos.Inventory.Response;

namespace api.Repository.Inventory
{
    public interface IGoodsReceiptRepository
    {
        Task<GoodsReceiptDetailResponse?> GetReceiptDetailAsync(Guid userId, Guid receiptId, CancellationToken cancellationToken);
        Task<Guid> CreateGoodsReceiptAsync(Guid shopId, CreateGoodsReceiptRequest request, CancellationToken cancellationToken);
    }
}
