using api.Database;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace api.Repository
{
    public class StoredProcedureRepository : IStoredProcedureRepository
    {
        private readonly MyAppDbContext _context;
        public StoredProcedureRepository(MyAppDbContext context)
        {
            _context = context;
        }

        public async Task<int> ExecuteAsync(string storedProcedureName, CancellationToken cancellationToken = default, params object[] parameters)
        {
            var parameterNames = GetParameterNames(parameters);
            var commandText = $"EXEC {storedProcedureName} {string.Join(", ", parameterNames)}";

            return await _context.Database.ExecuteSqlRawAsync(commandText, parameters, cancellationToken);
        }

        public async Task<List<T>> QueryAsync<T>(string storedProcedureName, CancellationToken cancellationToken = default, params object[] parameters) where T : class
        {
            // Tạo chuỗi command: "EXEC SpName @param1, @param2"
            var parameterNames = GetParameterNames(parameters);
            var commandText = $"EXEC {storedProcedureName} {string.Join(", ", parameterNames)}";

            // Sử dụng SqlQueryRaw cho các type không phải là Entity (Yêu cầu EF Core 7+)
            return await _context.Database
                .SqlQueryRaw<T>(commandText, parameters)
                .ToListAsync(cancellationToken);
        }

        public async Task<T?> QueryMultipleAsync<T>(string storedProcedureName, Func<SqlMapper.GridReader, Task<T>> mapFunc, CancellationToken cancellationToken = default, params object[] parameters)
        {
            // Mượn Connection của EF Core để xài cho Dapper
            var connection = _context.Database.GetDbConnection();

            // Đóng gói Parameter cho Dapper
            var dynamicParameters = new DynamicParameters();
            foreach (SqlParameter param in parameters)
            {
                dynamicParameters.Add(param.ParameterName, param.Value, param.DbType, param.Direction);
            }

            // Dùng Dapper gọi hàm và trả về hàm Map
            using var multi = await connection.QueryMultipleAsync(
                storedProcedureName,
                dynamicParameters,
                commandType: CommandType.StoredProcedure);

            return await mapFunc(multi);
        }

        private IEnumerable<string> GetParameterNames(object[] parameters)
        {
            var names = new List<string>();
            foreach (var param in parameters)
            {
                if (param is SqlParameter sqlParam)
                {
                    if (sqlParam.Direction == System.Data.ParameterDirection.Output ||
                        sqlParam.Direction == System.Data.ParameterDirection.InputOutput)
                    {
                        names.Add($"{sqlParam.ParameterName} OUTPUT");
                    }
                    else
                    {
                        names.Add(sqlParam.ParameterName);
                    }
                }
            }
            return names;
        }
    }
}
