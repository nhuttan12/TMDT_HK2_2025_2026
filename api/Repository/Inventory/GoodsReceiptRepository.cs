using api.Dtos.Inventory;
using Microsoft.Data.SqlClient;

namespace api.Repository.Inventory
{
    public class GoodsReceiptRepository (
        IStoredProcedureRepository storedProcedureRepository
        ) : IGoodsReceiptRepository
    {
        public async Task<GoodsReceiptDetailResponse?> GetReceiptDetailAsync(Guid userId, Guid receiptId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ReceiptId", receiptId),
                new SqlParameter("@ShopId", userId)
            };

            return await storedProcedureRepository.QueryMultipleAsync(
                "usp_GetGoodsReceiptDetail",
                async (reader) =>
                {
                    // Đọc bảng 1 (Thông tin phiếu)
                    var receipt = await reader.ReadSingleOrDefaultAsync<GoodsReceiptDetailResponse>();

                    if (receipt != null)
                    {
                        // Đọc bảng 2 (Danh sách lô hàng) đắp vào
                        receipt.Batches = (await reader.ReadAsync<GoodsReceiptBatchResponse>()).ToList();
                    }
                    return receipt;
                },
                default,
                parameters);
        }
    }
}
