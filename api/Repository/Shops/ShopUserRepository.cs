using api.Database;
using api.Dtos.Shops.Request;
using api.Dtos.Shops.Response;
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
