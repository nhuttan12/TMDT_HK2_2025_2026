using api.Dtos.Banners.Request;
using api.Dtos.Banners.Response;
using api.Dtos.Common;
using api.Utilities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.BannerRepo
{
    public class AdminBannerRepository(
        IStoredProcedureRepository storedProcedureRepository) : IAdminBannerRepository
    {
        public async Task<int> BulkUpdateBannersAsync(
            Guid UserId,
            CancellationToken CancellationToken,
            List<UpdateBannerDto> Banners)
        {
            var bannerTable = new DataTable();

            bannerTable.Columns.Add("ImageUrl", typeof(string));
            bannerTable.Columns.Add("Order", typeof(int));
            bannerTable.Columns.Add("IsPrimary", typeof(bool));

            foreach (var banner in Banners)
            {
                bannerTable.Rows.Add(banner.Url, banner.Order, banner.IsPrimary);
            }

            var parameters = new[]
            {
                new SqlParameter("@UserId", UserId),
                new SqlParameter
                {
                    ParameterName = "@Banners",
                    SqlDbType = SqlDbType.Structured,
                    TypeName = "dbo.BannerInsertType",
                    Value = bannerTable
                }
            };

            var rowsAffected = await storedProcedureRepository.ExecuteAsync(
                "[dbo].[usp_BulkUpdateBanners]",
                CancellationToken,
                parameters
            );

            return rowsAffected;
        }

        public async Task<PagedResult<AdminBannerPaging>> GetAdminBannersPagingAsync(Guid userId, CancellationToken cancellationToken, PaginationRequestDto paginationDTO)
        {
            var parameters = new object[]
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@PageNumber", paginationDTO.PageNumber),
                new SqlParameter("@PageSize", paginationDTO.PageSize)
            };

            // 3. Thực thi SP bằng generic repository của bạn
            var rawResults = await storedProcedureRepository.QueryAsync<AdminBannerPagingDbResult>(
                "usp_GetAdminBannersPaging",
                cancellationToken,
                parameters
            );

            // 4. Xử lý logic bóc tách TotalItems và tạo danh sách Items
            // Lấy TotalItems từ dòng đầu tiên (nếu có data), ngược lại bằng 0
            int totalCount = rawResults.FirstOrDefault()?.TotalItems ?? 0;

            // Map từ DbResult sang DTO chuẩn của bạn (Bỏ đi TotalItems)
            var items = rawResults.Select(r => new AdminBannerPaging(
                r.Id,
                r.ImageUrl,
                r.Order,
                r.IsPrimary,
                r.CreatedAt,
                r.UpdatedAt
            )).ToList();

            // 5. Đóng gói vào PagedResult
            var pagedResult = new PagedResult<AdminBannerPaging>(
                items,
                totalCount,
                paginationDTO.PageNumber,
                paginationDTO.PageSize
            );

            // 6. Trả về kết quả (Giả sử bạn đang dùng thư viện FluentResults hoặc custom Result)
            return pagedResult;
        }
    }
}
