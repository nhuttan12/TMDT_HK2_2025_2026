using Dapper;

namespace api.Repository
{
    public interface IStoredProcedureRepository
    {
        // Dành cho các SP đọc dữ liệu (SELECT)
        Task<List<T>> QueryAsync<T>(string storedProcedureName, CancellationToken cancellationToken = default, params object[] parameters) where T : class;

        // Dành cho các SP ghi dữ liệu (INSERT, UPDATE, DELETE)
        Task<int> ExecuteAsync(string storedProcedureName, CancellationToken cancellationToken = default, params object[] parameters);

        // Dành riêng cho Multiple Result Sets
        Task<T?> QueryMultipleAsync<T>(string storedProcedureName, Func<SqlMapper.GridReader, Task<T>> mapFunc, CancellationToken cancellationToken = default, params object[] parameters);
    }
}
