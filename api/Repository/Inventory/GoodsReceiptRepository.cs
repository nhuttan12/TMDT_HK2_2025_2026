using api.Dtos.Common;
using api.Dtos.Inventory.Requests;
using api.Dtos.Inventory.Response;
using api.Utilities;
using AutoMapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.Inventory
{
    public class GoodsReceiptRepository(
        IStoredProcedureRepository storedProcedureRepository,
        IMapper mapper
        ) : IGoodsReceiptRepository
    {
        public async Task<Guid> CreateGoodsReceiptAsync(Guid shopId, CreateGoodsReceiptRequest request, CancellationToken cancellationToken)
        {
            Console.WriteLine($"[TEST 1] C# hứng được từ Frontend: {request.Batches?.Count ?? -1} lô hàng");

            var batchesFlat = request.Batches.Select(b => new GoodsReceiptBatchTableType
            {
                product_id = b.ProductId,
                batch_code = b.BatchCode,
                quantity = b.Quantity,
                total_cost_price = b.TotalCostPrice
            });

            var variantsFlat = request.Batches.SelectMany(b => b.Items.Select(item => new GoodsReceiptBatchVariantTableType
            {
                batch_code = b.BatchCode,
                variant_id = item.ProductVariantId,
                cost_price = item.CostPrice
            }));

            var batchesTable = batchesFlat.ToDataTable();
            Console.WriteLine($"[TEST 2] Sau khi ToDataTable có: {batchesTable.Rows.Count} dòng");

            var colNames = batchesTable.Columns.Cast<DataColumn>().Select(x => x.ColumnName);
            Console.WriteLine(">>> THỨ TỰ CỘT BATCH THỰC SỰ LÀ: " + string.Join(" -> ", colNames));

            var variantsTable = variantsFlat.ToDataTable();

            var colNames2 = variantsTable.Columns.Cast<DataColumn>().Select(x => x.ColumnName);
            Console.WriteLine(">>> THỨ TỰ CỘT BATCH THỰC SỰ LÀ: " + string.Join(" -> ", colNames2));

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

        public async Task<PagedResult<GoodsReceiptPagingDtoResponse>> GetGoodsReceiptsByCodePagingAsync(Guid shopId, string code, PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId),
                new SqlParameter("@Code", string.IsNullOrWhiteSpace(code) ? DBNull.Value : code.Trim()),
                new SqlParameter("@PageNumber", request.PageNumber),
                new SqlParameter("@PageSize", request.PageSize)
            };

            // 2. Gọi SP thông qua Repository (Nhận về Raw DTO)
            var rawItems = await storedProcedureRepository.QueryAsync<RawGoodsReceiptPagingDto>(
                "usp_GetGoodsReceiptByCodePaging",
                cancellationToken,
                parameters);

            // 3. Trích xuất TotalItems (từ dòng đầu tiên nếu có)
            var totalItems = rawItems.FirstOrDefault()?.TotalItems ?? 0;

            // 4. Map từ Raw list sang Response list bằng AutoMapper
            var responseItems = mapper.Map<List<GoodsReceiptPagingDtoResponse>>(rawItems);

            // 5. Đóng gói vào đối tượng phân trang và trả về
            return new PagedResult<GoodsReceiptPagingDtoResponse>(responseItems, totalItems, request.PageNumber, request.PageSize);
        }

        public async Task<PagedResult<GoodsReceiptPagingDtoResponse>> GetGoodsReceiptsPagingAsync(Guid shopId, PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId),
                new SqlParameter("@PageNumber", request.PageNumber),
                new SqlParameter("@PageSize", request.PageSize)
            };

            // 2. Gọi SP thông qua Repository (Nhận về Raw DTO)
            var rawItems = await storedProcedureRepository.QueryAsync<RawGoodsReceiptPagingDto>(
                "usp_GetGoodsReceiptPaging",
                cancellationToken,
                parameters);

            // 3. Trích xuất TotalItems (từ dòng đầu tiên nếu có)
            var totalItems = rawItems.FirstOrDefault()?.TotalItems ?? 0;

            // 4. Map từ Raw list sang Response list bằng AutoMapper
            var responseItems = mapper.Map<List<GoodsReceiptPagingDtoResponse>>(rawItems);

            // 5. Đóng gói vào đối tượng phân trang và trả về
            return new PagedResult<GoodsReceiptPagingDtoResponse>(responseItems, totalItems, request.PageNumber, request.PageSize);
        }

        public async Task<PagedResult<ProductBatchPagingDtoResponse>> GetProductListInBatchPagingAsync(GetProductListInBatchRequest request, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@BatchId", request.BatchId),
                new SqlParameter("@ReceiptId", request.ReceiptId),
                new SqlParameter("@PageNumber", pagination.PageNumber),
                new SqlParameter("@PageSize", pagination.PageSize)
            };

            // 2. Gọi SP lấy dữ liệu thô
            var rawItems = await storedProcedureRepository.QueryAsync<RawProductBatchPagingDto>(
                "usp_GetProductListInBatchPaging",
                cancellationToken,
                parameters);

            // 3. Trích xuất tổng số record phục vụ phân trang
            var totalItems = rawItems.FirstOrDefault()?.TotalItems ?? 0;

            // 4. Map sang định dạng Response (camelCase)
            var responseItems = mapper.Map<List<ProductBatchPagingDtoResponse>>(rawItems);

            // 5. Đóng gói kết quả
            return new PagedResult<ProductBatchPagingDtoResponse>(responseItems, totalItems, pagination.PageNumber, pagination.PageSize);
        }

        public async Task<IEnumerable<ProductSelectionResponse>> GetProductSelectionForGoodsReceiptAsync(Guid shopId, CancellationToken cancellationToken = default)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId)
            };

            // 2. Gọi hàm QueryAsync đã được bọc sẵn từ interface
            var result = await storedProcedureRepository.QueryAsync<ProductSelectionResponse>(
                "usp_GetProductSelectionForGoodsReceipt",
                cancellationToken,
                parameters
            );

            return result;
        }

        public async Task<IEnumerable<ProductVariantSelectionResponse>> GetProductVariantSelectionAsync(Guid shopId, Guid productId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId),
                new SqlParameter("@ProductId", productId)
            };

            var result = await storedProcedureRepository.QueryAsync<ProductVariantSelectionResponse>(
                "usp_GetProductVariantListForSelectionGoodsReceipt",
                cancellationToken,
                parameters
            );

            return result;
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
