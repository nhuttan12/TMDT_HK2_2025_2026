using api.Controllers;
using api.Dtos.Users.Requests;
using api.Models;
using api.Repository.UserRepo;
using api.Utilities;
using Microsoft.Data.SqlClient;

namespace api.Services.Users
{
    public class BankingService (
        IBankingRepository bankingRepository
        ) : IBankingService
    {
        public async Task<Result<int>> AddBankAsync(Guid UserId, CancellationToken CancellationToken, List<UserBankingCreateDTO> Dtos)
        {
            try
            {
                var result = await bankingRepository.AddBankAsync(UserId, CancellationToken, Dtos);

                return Result<int>.Success(result);
            }
            catch (SqlException ex)
            {
                var sysError = new Error("System.DatabaseError", "Đã có lỗi xảy ra khi kết nối cơ sở dữ liệu.");
                return Result<int>.Failure(sysError);
            }
        }

        public async Task<Result<bool>> UpdateBankAsync(Guid userId, List<UserBankingCreateDTO> request, CancellationToken cancellationToken)
        {
            var result = await bankingRepository.UpdateBankAsync(userId, request, cancellationToken);

            return Result<bool>.Success(result);
        }
    }
}
