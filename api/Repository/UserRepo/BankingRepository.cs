using api.Controllers;
using api.Dtos.Users.Requests;
using api.Utilities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.UserRepo
{
    public class BankingRepository : IBankingRepository
    {
        private readonly IStoredProcedureRepository _spRepo;
        public BankingRepository(IStoredProcedureRepository spRepo)
        {
            _spRepo = spRepo;
        }

        public async Task<Result<int>> AddBankAsync(
            Guid UserId,
            CancellationToken CancellationToken,
            List<UserBankingCreateDTO> Dtos)
        {
            var dt = new DataTable();

            dt.Columns.Add("BankName", typeof(string));
            dt.Columns.Add("AccountNumber", typeof(string));
            dt.Columns.Add("AccountName", typeof(string));

            foreach (var dto in Dtos)
            {
                dt.Rows.Add(dto.BankName, dto.AccountNumber, dto.AccountName);
            }

            var parameters = new[]
            {
                new SqlParameter("@UserId", UserId),
                new SqlParameter
                {
                    ParameterName = "@BankList",
                    SqlDbType = SqlDbType.Structured,
                    TypeName = "dbo.UserBankingInsertType",
                    Value = dt
                }
            };

            int rowsAffected = await _spRepo.ExecuteAsync("usp_AddUserBanking", CancellationToken, parameters);

            return Result<int>.Success(rowsAffected);
        }
    }
}
