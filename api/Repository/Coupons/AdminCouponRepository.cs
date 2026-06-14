using api.Dtos.Common;
using api.Dtos.Coupons.Request;
using api.Dtos.Coupons.Response;
using api.Models;
using api.Utilities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.Coupons
{
    public class AdminCouponRepository(
        IStoredProcedureRepository storedProcedureRepository
        ) : IAdminCouponRepository
    {
        public async Task<Guid> CreateCouponAsync(Guid userId, CancellationToken cancellationToken, CreateCouponRequest request)
        {
            var outCouponIdParam = new SqlParameter("@OutCouponId", SqlDbType.UniqueIdentifier)
            {
                Direction = ParameterDirection.Output
            };

            // 2. Map toàn bộ dữ liệu vào mảng parameters
            var parameters = new object[]
            {
                new SqlParameter("@Code", request.Code),
                new SqlParameter("@Name", request.Name),
                new SqlParameter("@Scope", request.Scope),
                new SqlParameter("@Category", request.Category),
                new SqlParameter("@Type", request.Type),
                new SqlParameter("@DiscountValue", request.DiscountValue),
                
                // Xử lý Nullable: Nếu null thì truyền DBNull.Value xuống SQL Server
                new SqlParameter("@MaxDiscountAmount", (object?)request.MaxDiscountAmount ?? DBNull.Value),
                new SqlParameter("@MinInvoiceValue", (object?)request.MinInvoiceValue ?? DBNull.Value),

                new SqlParameter("@TotalQuantity", request.TotalQuantity),
                new SqlParameter("@StartAt", request.StartAt),

                new SqlParameter("@EndAt", (object?)request.EndAt ?? DBNull.Value),

                new SqlParameter("@Status", request.Status),
                new SqlParameter("@UserId", userId), // Lấy từ Controller (Token) truyền xuống
                
                // 3. Đưa tham số OUTPUT vào mảng
                outCouponIdParam
            };

            // 4. Thực thi Stored Procedure thông qua generic repo của bạn
            await storedProcedureRepository.ExecuteAsync(
                "usp_CreateCoupon",
                cancellationToken,
                parameters);

            // 5. Ép kiểu và trả về ID vừa được tạo
            return (Guid)outCouponIdParam.Value;
        }

        public async Task<CouponDetailResponse?> GetCouponDetailAsync(Guid userId, Guid couponId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@CouponId", couponId)
            };

            // 2. Gọi SP bằng QueryAsync
            var result = await storedProcedureRepository.QueryAsync<CouponDetailResponse>(
                "usp_GetCouponDetail",
                cancellationToken,
                parameters);

            // 3. Lấy phần tử đầu tiên, nếu không có dòng nào thì trả về null
            return result.FirstOrDefault();
        }

        public async Task<PagedResult<AdminCoupon>> GetAdminCouponPagingAsync(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@PageNumber", pagination.PageNumber),
                new SqlParameter("@PageSize", pagination.PageSize)
            };

            // 1. Thực thi SP và map vào record chứa dữ liệu thô (có TotalItems)
            var rawResults = await storedProcedureRepository.QueryAsync<RawAdminCoupon>(
                "usp_GetAdminCouponPaging",
                cancellationToken,
                parameters);

            // 2. Tách lấy tổng số dòng từ phần tử đầu tiên (nếu không có data thì gán = 0)
            int totalCount = rawResults.FirstOrDefault()?.TotalItems ?? 0;

            // 3. Map từ Raw data sang DTO chính thức cho Frontend
            var items = rawResults.Select(r => new AdminCoupon(
                r.Id,
                r.Code,
                r.Name,
                r.Scope,
                r.Category,
                r.Status,
                r.ShopId,
                r.Type,
                r.DiscountValue,
                r.MaxDiscountAmount,
                r.MinInvoiceValue,
                r.StartAt,
                r.EndAt,
                r.TotalQuantity,
                r.UsedQuantity
            )).ToList();

            // 4. Đóng gói vào chuẩn phân trang PagedResult
            return new PagedResult<AdminCoupon>(
                items,
                totalCount,
                pagination.PageNumber,
                pagination.PageSize
            );
        }
    }
}
