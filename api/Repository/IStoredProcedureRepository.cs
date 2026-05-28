namespace api.Repository
{
    public interface IStoredProcedureRepository
    {
        // Dành cho các SP đọc dữ liệu (SELECT)
        Task<List<T>> QueryAsync<T>(string storedProcedureName, params object[] parameters) where T : class;

        // Dành cho các SP ghi dữ liệu (INSERT, UPDATE, DELETE)
        Task<int> ExecuteAsync(string storedProcedureName, params object[] parameters);
    }
}
