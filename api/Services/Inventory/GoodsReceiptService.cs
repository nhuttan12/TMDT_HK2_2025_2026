using api.Dtos.Inventory.Requests;
using api.Dtos.Inventory.Response;
using api.Repository.Inventory;
using api.Utilities;

namespace api.Services.Inventory
{
    public class GoodsReceiptService (
        IGoodsReceiptRepository goodsReceiptRepository
        ) : IGoodsReceiptService
    {
        public async Task<Result<Guid>> CreateGoodsReceiptAsync(Guid shopId, CreateGoodsReceiptRequest request, CancellationToken cancellationToken)
        {
            var rowsAffected = await goodsReceiptRepository.CreateGoodsReceiptAsync(shopId, request, cancellationToken);

            if (rowsAffected <= 0)
            {
                return Result<Guid>.Failure(new Error(
                    "Database.Error",
                    "Không thể tạo phiếu nhập kho, vui lòng thử lại.",
                    ErrorType.Failure));
            }

            return Result<Guid>.Success(request.Id);
        }

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
