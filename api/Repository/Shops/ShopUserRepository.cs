using api.Dtos.Shops.Request;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.Shops
{
    public class ShopUserRepository(
        IStoredProcedureRepository storedProcedureRepository
        ) : IShopUserRepository
    {
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
                new SqlParameter("@PasswordHash", request.PasswordHash),
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
