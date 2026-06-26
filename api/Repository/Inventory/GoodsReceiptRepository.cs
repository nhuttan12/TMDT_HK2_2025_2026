using api.Dtos.Inventory.Requests;
using api.Dtos.Inventory.Response;
using api.Models.Enums.Inventory;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Text.Json;

namespace api.Repository.Inventory
{
    public class GoodsReceiptRepository(
        IStoredProcedureRepository storedProcedureRepository
        ) : IGoodsReceiptRepository
    {
        public async Task<Guid> CreateGoodsReceiptAsync(Guid shopId, CreateGoodsReceiptRequest request, CancellationToken cancellationToken)
        {
            var batchesTable = new DataTable();
            batchesTable.Columns.Add("product_id", typeof(Guid));
            batchesTable.Columns.Add("batch_code", typeof(string));
            batchesTable.Columns.Add("quantity", typeof(int));
            batchesTable.Columns.Add("total_cost_price", typeof(decimal));

            // Bảng Variants (Bỏ ID, bỏ batch_id, dùng batch_code làm cầu nối)
            var variantsTable = new DataTable();
            variantsTable.Columns.Add("batch_code", typeof(string));
            variantsTable.Columns.Add("variant_id", typeof(Guid));
            variantsTable.Columns.Add("cost_price", typeof(decimal));

            foreach (var batch in request.Batches)
            {
                batchesTable.Rows.Add(batch.ProductId, batch.BatchCode, batch.Quantity, batch.TotalCostPrice);

                foreach (var item in batch.Items)
                {
                    // Truyền BatchCode từ lô hàng cha xuống để map
                    variantsTable.Rows.Add(batch.BatchCode, item.ProductVariantId, item.CostPrice);
                }
            }

            var outputIdParam = new SqlParameter("@inserted_id", SqlDbType.UniqueIdentifier)
            {
                Direction = ParameterDirection.Output
            };

            var parameters = new object[]
            {
                new SqlParameter("@code", request.Code),
                new SqlParameter("@supplier_id", request.SupplierId),
                new SqlParameter("@shop_id", shopId),
                new SqlParameter("@import_date", request.ImportDate),
                new SqlParameter("@note", string.IsNullOrEmpty(request.Note) ? DBNull.Value : request.Note),
                new SqlParameter("@batches", SqlDbType.Structured) { TypeName = "dbo.udt_GoodsReceiptBatch", Value = batchesTable },
                new SqlParameter("@variants", SqlDbType.Structured) { TypeName = "dbo.udt_GoodsReceiptBatchVariant", Value = variantsTable },
                outputIdParam
            };

            await storedProcedureRepository.ExecuteAsync("usp_CreateGoodsReceipt", cancellationToken, parameters);

            if (outputIdParam.Value != DBNull.Value)
            {
                return (Guid)outputIdParam.Value;
            }

            return Guid.Empty;
        }

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
