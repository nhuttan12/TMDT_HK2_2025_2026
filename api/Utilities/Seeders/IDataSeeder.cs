using api.Database;

namespace api.Utilities.Seeders
{
    public interface IDataSeeder
    {
        // Thứ tự thực hiện: Số nhỏ chạy trước (VD: Category = 1, Product = 2)
        int ExecutionOrder { get; }

        Task SeedAsync(MyAppDbContext dbContext, string contentRootPath, ILogger logger, CancellationToken cancellationToken);
    }
}
