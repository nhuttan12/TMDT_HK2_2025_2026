using api.Database;
using api.Utilities;
using api.Utilities.Seeders;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions
{
    public static class SmartDataSeederExtension
    {
        public static async Task SeedSmartDataAsync(this WebApplication app, CancellationToken cancellationToken = default)
        {
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            var logger = services.GetRequiredService<ILoggerFactory>().CreateLogger("SeederEngine");
            var idgenaration = services.GetRequiredService<IIdGenerator>();
            var env = services.GetRequiredService<IWebHostEnvironment>();

            if (!env.IsDevelopment()) return;

            try
            {
                var dbContext = services.GetRequiredService<MyAppDbContext>();
                await dbContext.Database.MigrateAsync(cancellationToken);

                // Tự động quét và lấy ra TẤT CẢ các class implement IDataSeeder đã đăng ký
                // Sau đó sắp xếp theo ExecutionOrder (Từ nhỏ tới lớn)
                var seeders = services.GetServices<IDataSeeder>()
                                      .OrderBy(s => s.ExecutionOrder)
                                      .ToList();

                if (seeders.Count == 0)
                {
                    logger.LogWarning("Không có IDataSeeder nào được đăng ký trong hệ thống.");
                    return;
                }

                // Chạy tuần tự từng Seeder
                foreach (var seeder in seeders)
                {
                    var seederName = seeder.GetType().Name;
                    logger.LogInformation($"Đang chạy {seederName}...");

                    await seeder.SeedAsync(dbContext, env.ContentRootPath, logger, idgenaration, cancellationToken);
                }

                logger.LogInformation("Hoàn tất quá trình nạp dữ liệu.");
            }
            catch (Exception ex)
            {
                logger.LogCritical(ex, "Lỗi nghiêm trọng trong hệ thống Seeder Engine.");
                throw;
            }
        }
    }
}
