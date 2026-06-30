using api.Database;
using api.Dtos.SeedDtos;
using api.Models;
using api.Models.Shops;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace api.Utilities.Seeders
{
    public class ShopSeeder : IDataSeeder
    {
        public int ExecutionOrder => 2;

        public async Task SeedAsync(MyAppDbContext dbContext, string contentRootPath, ILogger logger, IIdGenerator idGenerator, CancellationToken cancellationToken)
        {
            logger.LogInformation("Bắt đầu nạp dữ liệu Shop...");

            var filePath = Path.Combine(contentRootPath, "Database", "Seeders", "SeedData", "Shops.json");
            if (!File.Exists(filePath))
            {
                logger.LogWarning("Không tìm thấy file dữ liệu tại {Path}", filePath);
                return;
            }

            var jsonString = await File.ReadAllTextAsync(filePath, cancellationToken);
            var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var seedData = JsonSerializer.Deserialize<List<UserSeedJsonDto>>(jsonString, jsonOptions);

            if (seedData is null || seedData.Count == 0) return;

            // Bắt buộc lấy Role để gán cho User
            var role = await dbContext.Roles.FirstOrDefaultAsync(r => r.Name == "Shop", cancellationToken);
            if (role is null)
            {
                logger.LogError("Không tìm thấy Role 'Shop'. Phải nạp RoleSeeder trước.");
                return;
            }

            // TỐI ƯU 1: Dùng ToHashSetAsync để check Contains mất O(1) CPU
            var processedShopNames = await dbContext.Shops
                .AsNoTracking()
                .Select(s => s.Name.Trim().ToLower())
                .ToHashSetAsync(cancellationToken);

            var usersToInsert = new List<User>();

            foreach (var shopDto in seedData)
            {
                // TỐI ƯU 2: Phải trỏ đúng vào shopDto.Shop.Name (Tên của Cửa hàng)
                var normalizedShopName = shopDto.Shop.Name.Trim().ToLower();

                // Nếu DB hoặc vòng lặp trước đó đã có tên này -> Bỏ qua
                if (processedShopNames.Contains(normalizedShopName)) continue;

                // TỐI ƯU 3: Thêm ngay tên shop vừa xử lý vào HashSet để chống lặp dữ liệu nội bộ trong file JSON
                processedShopNames.Add(normalizedShopName);

                var id = idGenerator.NewId();
                var result = User.Create(id, shopDto.Email, shopDto.Name, role, User.LOCAL_KEY, User.LOCAL_PROVIDER);
                result!.Value!.UpdatePassword("AQAAAAIAAYagAAAAED5iqpnHYEJGYeG06xv3YfgxQNzj65IH5ge5WZzhTsY7DaYXO26rjtcaIMovdmJ9Pg==");

                if (result.IsFailure)
                {
                    logger.LogError("Validation thất bại tạo User cho {Email}: {Error}", shopDto.Email, result.Error.Message);
                    continue;
                }

                var user = result.Value!;

                // Khởi tạo Shop qua Factory Method (Fail Fast)
                var shopResult = Shop.Create(user, shopDto.Shop.Name, shopDto.Shop.Description, shopDto.AvatarUrl);

                if (shopResult.IsFailure)
                {
                    logger.LogError("Validation thất bại tạo Shop cho {Email}: {Error}", shopDto.Email, shopResult.Error.Message);
                    continue;
                }

                user.AddShop(shopResult.Value!);
                usersToInsert.Add(user);
            }

            // TỐI ƯU 4: Chỉ gọi DB khi thực sự có dữ liệu mới
            if (usersToInsert.Any())
            {
                await dbContext.Users.AddRangeAsync(usersToInsert, cancellationToken);
                await dbContext.SaveChangesAsync(cancellationToken);
                logger.LogInformation("Nạp thành công {Count} Cửa hàng mới.", usersToInsert.Count);
            }
            else
            {
                logger.LogInformation("Không có Cửa hàng mới nào cần nạp.");
            }
        }

    }
}
