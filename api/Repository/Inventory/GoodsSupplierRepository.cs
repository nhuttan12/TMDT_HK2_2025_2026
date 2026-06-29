using api.Dtos.Common;
using api.Dtos.Inventory.Response;
using api.Utilities;
using AutoMapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.Inventory
{
    public class GoodsSupplierRepository (
        IStoredProcedureRepository storedProcedureRepository,
        IMapper mapper
        ) : IGoodsSupplierRepository
    {
        public async Task<Guid> CreateSupplierAsync(Guid shopId, CreateSupplierRequestDto request, CancellationToken cancellationToken)
        {
            var outputIdParam = new SqlParameter("@OutputSupplierId", SqlDbType.UniqueIdentifier)
            {
                Direction = ParameterDirection.Output
            };

            var parameters = new SqlParameter[]
            {
            new SqlParameter("@ShopId", shopId),
            new SqlParameter("@SupplierName", request.SupplierName),
            new SqlParameter("@ContactName", string.IsNullOrWhiteSpace(request.ContactName) ? DBNull.Value : request.ContactName),
            new SqlParameter("@PhoneNumber", string.IsNullOrWhiteSpace(request.PhoneNumber) ? DBNull.Value : request.PhoneNumber),
            new SqlParameter("@Email", string.IsNullOrWhiteSpace(request.Email) ? DBNull.Value : request.Email),
            new SqlParameter("@Address", string.IsNullOrWhiteSpace(request.Address) ? DBNull.Value : request.Address),
            new SqlParameter("@TaxCode", string.IsNullOrWhiteSpace(request.TaxCode) ? DBNull.Value : request.TaxCode),

            outputIdParam // Nhét param hứng vào danh sách gửi đi
            };

            // 2. Gọi hàm ExecuteAsync (thay vì QueryAsync) vì đây là lệnh INSERT
            await storedProcedureRepository.ExecuteAsync(
                "usp_CreateSupplier",
                cancellationToken,
                parameters
            );

            // 3. Bóc kết quả từ chính param Output ra trả về cho tầng trên
            return (Guid)outputIdParam.Value;
        }

        public async Task<PagedResult<GoodsSupplierResponseDto>> GetSupplierListPagingAsync(Guid shopId, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var parameters = new SqlParameter[]
        {
            // Trong DB bạn đặt tên tham số là @UserId thì ở đây truyền đúng chuỗi "@UserId"
            new SqlParameter("@UserId", shopId),
            new SqlParameter("@PageNumber", pagination.PageNumber),
            new SqlParameter("@PageSize", pagination.PageSize)
        };

            var rawData = await storedProcedureRepository.QueryAsync<RawGoodsSupplierDto>(
                "usp_GetGoodsSupplierListPaging",
                cancellationToken,
                parameters
            );

            var rawList = rawData.ToList();

            // 1. Map danh sách Raw -> Danh sách Response sạch
            var responseItems = mapper.Map<List<GoodsSupplierResponseDto>>(rawList);

            // 2. Nhặt tổng số record từ dòng đầu tiên
            int totalCount = rawList.FirstOrDefault()?.TotalItems ?? 0;

            return new PagedResult<GoodsSupplierResponseDto>(
                responseItems,
                totalCount,
                pagination.PageNumber,
                pagination.PageSize
            );
        }

        public async Task<GoodsSupplierDetailResponseDto?> GetSupplierDetailAsync(Guid shopId, Guid supplierId, CancellationToken cancellationToken)
        {
            var parameters = new SqlParameter[]
        {
            new SqlParameter("@ShopId", shopId),
            new SqlParameter("@SupplierId", supplierId)
        };

            var result = await storedProcedureRepository.QueryAsync<GoodsSupplierDetailResponseDto>(
                "usp_GetGoodsSupplierDetail",
                cancellationToken,
                parameters
            );

            // Trả về đúng 1 object hoặc null (nếu truyền sai ID hoặc ID đó không thuộc về Shop này)
            return result.SingleOrDefault();
        }

        public async Task<IEnumerable<SupplierOptionResponseDto>> GetSupplierOptionsByShopIdAsync(Guid shopId, CancellationToken cancellationToken)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@ShopId", shopId)
            };

            // 1. Gọi Repo gốc hứng data thô
            var rawData = await storedProcedureRepository.QueryAsync<RawSupplierOptionDto>(
                "usp_GetSupplierByShopId",
                cancellationToken,
                parameters
            );

            // 2. Map sang Response ngay tại Repo và trả về
            return mapper.Map<IEnumerable<SupplierOptionResponseDto>>(rawData);
        }
    }
}
