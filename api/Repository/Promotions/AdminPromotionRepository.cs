using api.Dtos.Common;
using api.Dtos.Promotiions.Request;
using api.Dtos.Promotiions.Response;
using api.Utilities;
using AutoMapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.Promotions
{
    public class AdminPromotionRepository(
        IStoredProcedureRepository storedProcedureRepository,
        IMapper mapper
        ) : IAdminPromotionRepository
    {
        public async Task<Guid> CreatePromotion(UpdatePromotion request, CancellationToken cancellationToken)
        {
            var productTable = new DataTable();
            productTable.Columns.Add("ProductId", typeof(Guid));
            productTable.Columns.Add("PromotionId", typeof(Guid));
            productTable.Columns.Add("Discount", typeof(int));

            // Map dữ liệu từ request.Products vào DataTable
            if (request.Products != null)
            {
                foreach (var item in request.Products)
                {
                    // Truyền Guid.Empty cho PromotionId vì SQL sẽ tự động ghi đè bằng ID mới
                    productTable.Rows.Add(item.ProductId, Guid.Empty, item.Discount);
                }
            }

            // 2. Tạo Parameter dạng Table
            var tvpParameter = new SqlParameter("@Products", SqlDbType.Structured)
            {
                TypeName = "dbo.ProductPromotionType",
                Value = productTable
            };

            // 3. Tạo Parameter OUTPUT để hứng PromotionId vừa tạo
            var outIdParameter = new SqlParameter("@NewPromotionId", SqlDbType.UniqueIdentifier)
            {
                Direction = ParameterDirection.Output
            };

            // 4. Bóc tách dữ liệu từ request vào mảng parameter
            var parameters = new object[]
            {
                new SqlParameter("@Name", request.Name),
                new SqlParameter("@Status", request.Status),
                new SqlParameter("@StartAt", request.StartAt),
                new SqlParameter("@EndAt", request.EndAt),
                tvpParameter,
                outIdParameter
            };

            // 5. Thực thi lệnh INSERT
            await storedProcedureRepository.ExecuteAsync(
                "usp_CreatePromotion",
                cancellationToken,
                parameters);

            // 6. Trả về Id mới sinh ra
            return (Guid)outIdParameter.Value;
        }

        public async Task<PromotionDetail?> GetPromotionDetail(Guid promotionId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@PromotionId", promotionId)
            };

            // Gọi QueryAsync để lấy danh sách các variant được áp dụng khuyến mãi
            var results = await storedProcedureRepository.QueryAsync<PromotionDetail>(
                "usp_GetPromotionDetail",
                cancellationToken,
                parameters);

            return results.FirstOrDefault();
        }

        public async Task<PagedResult<ShopPromotion>> GetPromotionPaging(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@PageNumber", pagination.PageNumber),
                new SqlParameter("@PageSize", pagination.PageSize)
            };

            // 2. Gọi SP và hứng dữ liệu vào Raw Record (Có TotalItems)
            var rawResults = await storedProcedureRepository.QueryAsync<RawShopPromotion>(
                "usp_GetPromotionPaging",
                cancellationToken,
                parameters);

            // 3. Tách lấy tổng số dòng từ phần tử đầu tiên (Nếu rỗng thì gán = 0)
            int totalCount = rawResults.FirstOrDefault()?.TotalItems ?? 0;

            // 4. Map từ Raw data sang DTO chính thức cho Frontend
            var items = mapper.Map<List<ShopPromotion>>(rawResults);

            // 5. Đóng gói vào chuẩn phân trang PagedResult và trả về
            return new PagedResult<ShopPromotion>(
                items,
                totalCount,
                pagination.PageNumber,
                pagination.PageSize
            );
        }

        public async Task<bool> UpdatePromotionAsync(UpdatePromotion request, CancellationToken cancellationToken)
        {
            var productTable = new DataTable();
            productTable.Columns.Add("ProductId", typeof(Guid));
            productTable.Columns.Add("PromotionId", typeof(Guid));
            productTable.Columns.Add("Discount", typeof(int));

            // Map dữ liệu từ request.Products vào DataTable
            if (request.Products != null)
            {
                foreach (var item in request.Products)
                {
                    // Truyền Guid.Empty cho PromotionId vì SQL sẽ tự động ghi đè bằng ID mới
                    productTable.Rows.Add(item.ProductId, Guid.Empty, item.Discount);
                }
            }

            // 2. Tạo Parameter dạng Table
            var tvpParameter = new SqlParameter("@Products", SqlDbType.Structured)
            {
                TypeName = "dbo.ProductPromotionType",
                Value = productTable
            };

            var rowsAffectedParam = new SqlParameter("@RowsAffected", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };

            var parameters = new object[]
            {
                new SqlParameter("@PromotionId", request.PromotionId),
                new SqlParameter("@Name", request.Name),
                new SqlParameter("@Status", request.Status),
                new SqlParameter("@StartAt", request.StartAt),
                new SqlParameter("@EndAt", request.EndAt),
                tvpParameter,
                rowsAffectedParam // Hứng số dòng thay đổi
            };

            await storedProcedureRepository.ExecuteAsync(
                "usp_UpdatePromotion", 
                cancellationToken, 
                parameters);

            int rowsAffected = (int)(rowsAffectedParam.Value ?? 0);

            // Trả về true nếu có ít nhất 1 dòng được cập nhật, ngược lại là false
            return rowsAffected > 0;
        }
    }
}
