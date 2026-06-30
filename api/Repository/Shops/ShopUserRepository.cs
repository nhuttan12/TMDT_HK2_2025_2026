using api.Database;
using api.Dtos.Shops.Request;
using api.Dtos.Shops.Response;
using api.model.Products;
using api.Services.Shops;
using api.Utilities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace api.Repository.Shops
{
    public class ShopUserRepository(
        IStoredProcedureRepository storedProcedureRepository,
        MyAppDbContext context
        ) : IShopUserRepository
    {
        public async Task<ShopNameResponse> GetListNameShop(CancellationToken cancellationToken)
        {
            var res = await context.Shops
                .AsNoTracking()
                .Select(s => new ShopNameDto(s.Id,s.Name))
                .ToListAsync(cancellationToken);
            return new ShopNameResponse(res);
        }

        public async Task<PagedResult<ShopCardResponseDto>> GetListShop(int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var query = context.Shops.AsNoTracking();
            var totalCount = await query.CountAsync(cancellationToken);
            var items = await query
             .OrderBy(s => s.Id) // Bắt buộc phải OrderBy trước khi Skip/Take
             .Skip((pageNumber - 1) * pageSize)
             .Take(pageSize)
             .Select(s => new ShopCardResponseDto(
                 s.Id,
                 s.Name,
                 s.Description,
                 s.ShopLogo,
                 s.Products.Count // Tính toán số lượng Product trực tiếp qua Navigation Property ở DB
             ))
             .ToListAsync(cancellationToken);

            return new PagedResult<ShopCardResponseDto>(items, totalCount, pageNumber, pageSize);
        }

        public async Task<Guid> RegisterShopAsync(ShopRegistrationRequest request, CancellationToken cancellationToken)
        {
            var outUserIdParam = new SqlParameter("@OutUserId", SqlDbType.UniqueIdentifier)
            {
                Direction = ParameterDirection.Output
            };

            // 2. Đóng gói các tham số từ Request
            var parameters = new object[]
            {
                new SqlParameter("@Email", request.Email),
                new SqlParameter("@Phone", (object?)request.Phone ?? DBNull.Value),
                new SqlParameter("@Password", request.Password),
                new SqlParameter("@ShopName", request.ShopName),
                new SqlParameter("@Description", (object?)request.Description ?? DBNull.Value),
                new SqlParameter("@AddressUrl", request.AddressUrl),
                new SqlParameter("@BankName", request.BankName),
                new SqlParameter("@AccountName", request.AccountName),
                new SqlParameter("@AccountNumber", request.AccountNumber),
                outUserIdParam // Truyền tham số OUTPUT vào cuối cùng
            };

            // 3. Thực thi (ExecuteAsync dùng cho thao tác INSERT/UPDATE/DELETE)
            await storedProcedureRepository.ExecuteAsync(
                "usp_RegisterShop",
                cancellationToken,
                parameters);

            // 4. Ép kiểu và trả về UserId lấy được từ SQL
            return (Guid)outUserIdParam.Value;
        }
    }
}
