using api.Controllers;
using api.Dtos.Users.Requests;
using api.Utilities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.UserRepo
{
    public class BankingRepository (
        IStoredProcedureRepository storedProcedureRepository
        ) : IBankingRepository
    {
        public async Task<int> AddBankAsync(
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

            int rowsAffected = await storedProcedureRepository.ExecuteAsync("usp_AddUserBanking", CancellationToken, parameters);

            return rowsAffected;
        }

        public async Task<bool> UpdateBankAsync(Guid userId, List<UserBankingCreateDTO> request, CancellationToken cancellationToken)
        {
            var bankingTable = new DataTable();
            bankingTable.Columns.Add("BankName", typeof(string));
            bankingTable.Columns.Add("AccountNumber", typeof(string));
            bankingTable.Columns.Add("AccountName", typeof(string));

            // Đổ dữ liệu từ DTO vào DataTable
            if (request != null)
            {
                foreach (var bank in request)
                {
                    bankingTable.Rows.Add(bank.BankName, bank.AccountNumber, bank.AccountName);
                }
            }

            // 2. Tạo Parameter dạng Table
            var tvpParameter = new SqlParameter("@UserBankings", SqlDbType.Structured)
            {
                TypeName = "dbo.UserBankingInsertType", // Tên Type dưới SQL Server
                Value = bankingTable
            };

            // 3. Tạo Parameter OUTPUT để hứng tổng số dòng thay đổi
            var rowsAffectedParam = new SqlParameter("@RowsAffected", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };

            // 4. Tổng hợp parameters
            var parameters = new object[]
            {
                new SqlParameter("@UserId", userId),
                tvpParameter,
                rowsAffectedParam
            };

            // 5. Thực thi ExecuteAsync
            await storedProcedureRepository.ExecuteAsync(
                "usp_UpdateUserBanking",
                cancellationToken,
                parameters);

            // 6. Trả về kết quả
            int rowsAffected = (int)(rowsAffectedParam.Value ?? 0);

            return rowsAffected > 0;
        }
    }
}
