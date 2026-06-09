using api.Database;
using api.Dtos.SeedDtos;
using api.Models.Category;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace api.Utilities.Seeders
{
    public class CategorySeeder : IDataSeeder
    {
        public int ExecutionOrder => 1; // Chạy số 1

        public async Task SeedAsync(MyAppDbContext dbContext, string contentRootPath, ILogger logger, IIdGenerator idGenerator, CancellationToken cancellationToken)
        {
            var filePath = Path.Combine(contentRootPath, "Database", "Seeders", "SeedData", "Categories.json");
            if (!File.Exists(filePath)) return;

            var jsonString = await File.ReadAllTextAsync(filePath, cancellationToken);
            var seedData = JsonSerializer.Deserialize<List<CategorySeedDto>>(jsonString);
            if (seedData == null || seedData.Count == 0) return;

            // Sử dụng HashSet thay vì List để tốc độ kiểm tra Contains() đạt O(1)
            var existingNames = await dbContext.Categories
                .AsNoTracking()
                .Select(c => c.Name.ToLower().Trim())
                .ToHashSetAsync(cancellationToken); // .NET 9 hỗ trợ ToHashSetAsync

            var entitiesToInsert = new List<Category>();

            foreach (var item in seedData)
            {
                if (existingNames.Contains(item.Name.ToLower().Trim())) continue;
                Result<Category> res = Category.Create(item.Name.Trim(), item.Sku.Trim(), item.ImageUrl.Trim());
                if (!res.IsSuccess! || res.Value == null)
                {
                    LoggerExtensions.LogWarning(logger, $"data: {item.Name}, {item.Sku}");
                    LoggerExtensions.LogError(logger, $"[CategorySeeder] Lỗi tạo entity Category từ seed data: {item.Name}. Lỗi: {res.Error.Message}");
                    continue;
                }
                entitiesToInsert.Add(res.Value);
            }

            if (entitiesToInsert.Count > 0)
            {
                await dbContext.Categories.AddRangeAsync(entitiesToInsert, cancellationToken);
                await dbContext.SaveChangesAsync(cancellationToken);
                logger.LogInformation($"[CategorySeeder] Đã nạp thêm {entitiesToInsert.Count} danh mục mới.");
            }
        }
    }
}
