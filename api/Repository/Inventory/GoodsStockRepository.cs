using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Utilities;
using AutoMapper;
using Microsoft.Data.SqlClient;

namespace api.Repository.Inventory
{
    public class GoodsStockRepository(
        IStoredProcedureRepository storedProcedureRepository,
        IMapper mapper
        ) : IGoodsStockRepository
    {
        public async Task<PagedResult<ProductInStockDtoResponse>> GetPagedProductsInStockByVariantNameAsync(Guid shopId, string? productName, PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var parameters = new SqlParameter[]
        {
            new SqlParameter("@ShopId", shopId),
            new SqlParameter("@ProductName", string.IsNullOrEmpty(productName) ? DBNull.Value : productName),
            new SqlParameter("@PageNumber", request.PageNumber),
            new SqlParameter("@PageSize", request.PageSize)
        };

            // 1. Gọi Repo hứng mảng data thô từ Stored Procedure
            var rawData = await storedProcedureRepository.QueryAsync<RawProductInStockDto>(
                "usp_GetProductInStockByVariantNamePaging",
                cancellationToken,
                parameters
            );

            var rawList = rawData.ToList();

            // 2. Dùng AutoMapper quét biến danh sách Raw -> danh sách Response
            var responseItems = mapper.Map<List<ProductInStockDtoResponse>>(rawList);

            // 3. Nhặt TotalItems từ phần tử đầu tiên (an toàn với Null)
            int totalCount = rawList.FirstOrDefault()?.TotalItems ?? 0;

            // 4. Khởi tạo đối tượng phân trang truyền vào Constructor
            return new PagedResult<ProductInStockDtoResponse>(
                responseItems,
                totalCount,
                request.PageNumber,
                request.PageSize
            );
        }

        public async Task<PagedResult<ProductInStockDtoResponse>> GetPagedRawProductInStockAsync(Guid shopId, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var parameters = new SqlParameter[]
        {
            new SqlParameter("@ShopId", shopId),
            new SqlParameter("@PageNumber", pagination.PageNumber),
            new SqlParameter("@PageSize", pagination.PageSize)
        };

            // 1. Lấy dữ liệu thô từ database
            var rawData = await storedProcedureRepository.QueryAsync<RawProductInStockDto>(
                "usp_GetProductInStockPaging",
                cancellationToken,
                parameters
            );

            var rawList = rawData.ToList();

            // 2. Map trực tiếp từ Raw sang Response ngay tại Repo
            var responseItems = mapper.Map<List<ProductInStockDtoResponse>>(rawList);
            int totalCount = rawList.FirstOrDefault()?.TotalItems ?? 0;

            // 3. Trả về PagedResult chứa DTO Response sạch sẽ
            return new PagedResult<ProductInStockDtoResponse>(
                responseItems,
                totalCount,
                pagination.PageNumber,
                pagination.PageSize
            );
        }

        public async Task<PagedResult<ProductBySupplierIdResponse>> GetProductPagingBySupplierId(Guid supplierId, Guid shopId, int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var parameters = new SqlParameter[]
        {
            new SqlParameter("@SupplierId", supplierId),
            new SqlParameter("@ShopId", shopId),
            new SqlParameter("@PageNumber", pageNumber),
            new SqlParameter("@PageSize", pageSize)
        };

            var rawData = await storedProcedureRepository.QueryAsync<RawProductBySupplierId>(
                "usp_GetProductPagingBySupplierId",
                cancellationToken,
                parameters
            );

            var rawList = rawData.ToList();

            // Thực hiện mapping ngay tại repo để giấu kín RawProductDto khỏi tầng trên
            var responseItems = mapper.Map<List<ProductBySupplierIdResponse>>(rawList);
            int totalCount = rawList.FirstOrDefault()?.TotalItems ?? 0;

            return new PagedResult<ProductBySupplierIdResponse>(
                responseItems,
                totalCount,
                pageNumber,
                pageSize
            );
        }

        public async Task<GoodsStockSummaryDto> GetStockSummaryAsync(Guid shopId, CancellationToken cancellationToken)
        {
            var parameters = new SqlParameter[]
        {
            new SqlParameter("@ShopId", shopId)
        };

            // Gọi xuống Repo
            var result = await storedProcedureRepository.QueryAsync<GoodsStockSummaryDto>(
                "usp_GetGoodsStockSummary",
                cancellationToken,
                parameters
            );

            // Vì SP trả về bảng 1 dòng, ta bóc dòng đầu tiên ra. 
            // Nếu shop mới tinh chưa có data, trả về object rỗng toàn số 0.
            return result.SingleOrDefault() ?? new GoodsStockSummaryDto();
        }
    }
}
