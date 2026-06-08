using api.Database;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StoredProcedureRepository : IStoredProcedureRepository
    {
        private readonly MyAppDbContext _context;
        public StoredProcedureRepository(MyAppDbContext context)
        {
            _context = context;
        }

        public async Task<int> ExecuteAsync(string storedProcedureName, params object[] parameters)
        {
            var parameterNames = GetParameterNames(parameters);
            var commandText = $"EXEC {storedProcedureName} {string.Join(", ", parameterNames)}";

            return await _context.Database.ExecuteSqlRawAsync(commandText, parameters);
        }

        public async Task<List<T>> QueryAsync<T>(string storedProcedureName, params object[] parameters) where T : class
        {
            // Tạo chuỗi command: "EXEC SpName @param1, @param2"
            var parameterNames = GetParameterNames(parameters);
            var commandText = $"EXEC {storedProcedureName} {string.Join(", ", parameterNames)}";

            // Sử dụng SqlQueryRaw cho các type không phải là Entity (Yêu cầu EF Core 7+)
            return await _context.Database
                .SqlQueryRaw<T>(commandText, parameters)
                .ToListAsync();
        }

        private IEnumerable<string> GetParameterNames(object[] parameters)
        {
            var names = new List<string>();
            foreach (var param in parameters)
            {
                if (param is SqlParameter sqlParam)
                {
                    names.Add(sqlParam.ParameterName);
                }
            }
            return names;
        }
    }
}
