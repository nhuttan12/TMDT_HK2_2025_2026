using api.Controllers;
using api.Dtos.Users.Requests;
using api.Repository.UserRepo;
using api.Utilities;
using Microsoft.Data.SqlClient;

namespace api.Services.Users
{
    public class BankingService : IBankingService
    {
        private readonly IBankingRepository _bankingRepository;

        public BankingService(IBankingRepository bankingRepository)
        {
            _bankingRepository = bankingRepository;
        }

        public async Task<Result<int>> AddBankAsync(Guid UserId, CancellationToken CancellationToken, List<UserBankingCreateDTO> Dtos)
        {
            try
            {
                var result = await _bankingRepository.AddBankAsync(UserId, CancellationToken, Dtos);

                return result;
            }
            catch (SqlException ex)
            {
                var sysError = new Error("System.DatabaseError", "Đã có lỗi xảy ra khi kết nối cơ sở dữ liệu.");
                return Result<int>.Failure(sysError);
            }
        }
    }
}
