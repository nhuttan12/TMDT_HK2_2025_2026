using api.Dtos.Common;
using api.Dtos.Shops.Response;
using api.Models.Shops;
using api.Utilities;
using AutoMapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.Shops
{
    public class ShopAdminRepository(
        IStoredProcedureRepository storedProcedureRepository,
        IMapper mapper
        ) : IShopAdminRepository
    {
        public async Task<bool> ApproveShop(Guid shopId, CancellationToken cancellationToken)
        {
            var rowsAffectedParam = new SqlParameter("@RowsAffected", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };

            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId),
                rowsAffectedParam
            };

            // 2. Gọi SP
            await storedProcedureRepository.ExecuteAsync(
                "usp_ApproveShop",
                cancellationToken,
                parameters);

            // 3. Kiểm tra số dòng. Nếu > 0 nghĩa là duyệt thành công. Nếu = 0 là không tìm thấy Shop.
            int rowsAffected = (int)(rowsAffectedParam.Value ?? 0);
            return rowsAffected > 0;
        }

        public async Task<PagedResult<ShopAdmin>> GetShopApprovalList(PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@PageNumber", request.PageNumber),
                new SqlParameter("@PageSize", request.PageSize)
            };

            // 2. Hứng dữ liệu từ SP vào Record Thô (Raw)
            var rawResults = await storedProcedureRepository.QueryAsync<RawShopAdmin>(
                "usp_GetShopApprovalList",
                cancellationToken,
                parameters);

            // 3. Tách lấy tổng số record từ dòng đầu tiên (nếu list rỗng thì trả về 0)
            int totalCount = rawResults.FirstOrDefault()?.TotalItems ?? 0;

            // 4. DÙNG AUTOMAPPER: Chuyển đổi toàn bộ List<Raw> sang List<Sạch> chỉ với 1 dòng
            var items = mapper.Map<List<ShopAdmin>>(rawResults);

            // 5. Đóng gói vào PagedResult và trả về
            return new PagedResult<ShopAdmin>(
                items,
                totalCount,
                request.PageNumber,
                request.PageSize
            );
        }

        public async Task<ShopDetailInfo?> GetShopDetailInfo(Guid shopId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId)
            };

            // Hứng kết quả từ SP
            var results = await storedProcedureRepository.QueryAsync<ShopDetailInfo>(
                "usp_GetShopDetailInfo",
                cancellationToken,
                parameters);

            // Chỉ lấy 1 dòng đầu tiên, nếu không có trả về null
            return results.FirstOrDefault();
        }

        public async Task<PagedResult<ShopAdmin>> GetShopList(PaginationRequestDto request, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@PageNumber", request.PageNumber),
                new SqlParameter("@PageSize", request.PageSize)
            };

            // 2. Hứng dữ liệu từ SP vào Record Thô (Raw)
            var rawResults = await storedProcedureRepository.QueryAsync<RawShopAdmin>(
                "usp_GetShopList",
                cancellationToken,
                parameters);

            // 3. Tách lấy tổng số record từ dòng đầu tiên (nếu list rỗng thì trả về 0)
            int totalCount = rawResults.FirstOrDefault()?.TotalItems ?? 0;

            // 4. DÙNG AUTOMAPPER: Chuyển đổi toàn bộ List<Raw> sang List<Sạch> chỉ với 1 dòng
            var items = mapper.Map<List<ShopAdmin>>(rawResults);

            // 5. Đóng gói vào PagedResult và trả về
            return new PagedResult<ShopAdmin>(
                items,
                totalCount,
                request.PageNumber,
                request.PageSize
            );
        }

        public async Task<ShopProfile?> GetShopProfile(Guid shopId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId)
            };

            // 2. Gọi SP và hứng kết quả bằng QueryAsync
            var results = await storedProcedureRepository.QueryAsync<ShopProfile>(
                "usp_GetShopProfile",
                cancellationToken,
                parameters);

            // 3. Lấy dòng đầu tiên trả về
            return results.FirstOrDefault();
        }
    }
}
