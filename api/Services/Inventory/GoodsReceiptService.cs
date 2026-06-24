using api.Dtos.Inventory;
using api.Repository.Inventory;
using api.Utilities;

namespace api.Services.Inventory
{
    public class GoodsReceiptService (
        IGoodsReceiptRepository goodsReceiptRepository
        ) : IGoodsReceiptService
    {
        public async Task<Result<GoodsReceiptDetailResponse>> GetReceiptDetailAsync(
            Guid userId, Guid receiptId, CancellationToken cancellationToken)
        {
            var result = await goodsReceiptRepository.GetReceiptDetailAsync(
                userId,
                receiptId,
                cancellationToken);

            if (result == null)
            {
                return Result<GoodsReceiptDetailResponse>.Failure(Error.Create("NotFound", "Không tìm thấy phiếu nhập kho hoặc bạn không có quyền truy cập."));
            }

            return Result<GoodsReceiptDetailResponse>.Success(result);
        }
    }
}
