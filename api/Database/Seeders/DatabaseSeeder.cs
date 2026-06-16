using api.Models;
using api.Models.Roles;
using api.Services.Auths;
using api.Utilities;
using Microsoft.EntityFrameworkCore;

namespace api.Database.Seeders
{
    public class DatabaseSeeder
    {
        // Chỉ nhận IServiceProvider để tự động resolve (phân giải) các Dependency
        public static async Task SeedAsync(IServiceProvider serviceProvider, IIdGenerator idGenerator, CancellationToken ct = default)
        {
            // 1. Resolve (Lấy ra) các service cần thiết từ DI Container
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<MyAppDbContext>(); // Dùng trực tiếp ApplicationDbContext
            var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
            var authService = scope.ServiceProvider.GetRequiredService<IAuthService>();
            var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("DatabaseSeeder");

            try
            {
                logger.LogInformation("Bắt đầu quá trình khởi tạo và Seed dữ liệu Database...");

                // 2. Áp dụng Migration tự động
                if ((await context.Database.GetPendingMigrationsAsync(ct)).Any())
                {
                    await context.Database.MigrateAsync(ct);
                    logger.LogInformation("Đã chạy Migration thành công.");
                }

                // 3. Lấy và kiểm tra cấu hình (Fail Fast)
                var email = config["InitialSetup:Email"];
                var password = config["InitialSetup:Password"];
                var roles = config.GetSection("InitialSetup:RoleList").Get<List<string>>();

                if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password) || roles == null || !roles.Any())
                {
                    logger.LogError("Cấu hình InitialSetup thiếu thông tin nghiêm trọng. Bỏ qua bước Seed!");
                    return;
                }

                // 4. Xử lý Roles (Tối ưu I/O)
                var existingRoles = await context.Roles.ToListAsync(ct); // Gọi thẳng context.Roles thay vì Set<Role>()
                foreach (var roleName in roles)
                {
                    if (!existingRoles.Any(r => r.Name == roleName))
                    {
                        context.Roles.Add(Role.Create(roleName));
                        logger.LogInformation("Thêm Role mới: {RoleName}", roleName);
                    }
                }
                await context.SaveChangesAsync(ct); // Lưu Role trước để có thể gán cho User ở bước sau

                // 5. Xử lý Admin Account (Đã fix lỗi crash)
                var adminExists = await context.Users.AnyAsync(u => u.Email == email, ct);
                if (!adminExists)
                {
                    var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin", ct);
                    if (adminRole == null)
                    {
                        logger.LogCritical("Không thể tạo Admin vì thiếu Role 'Admin' trong hệ thống!");
                        return;
                    }
                    var id = idGenerator.NewId();
                    // Giả định User.Create trả về đối tượng User theo chuẩn DDD
                    var result = User.Create(id, email, "Admin", adminRole, User.LOCAL_KEY, User.LOCAL_PROVIDER);
                    if(result.IsFailure)
                    {
                        logger.LogError("Tạo User Admin thất bại: {ErrorMessage}", result.Error.Message);
                        return;
                    }
                    var adminUser = result.IsSuccess ? result.Value : null;
                    // Rich Domain Model: Gán hash thông qua phương thức, không dùng public setter
                    var hash = authService.HashPassword(adminUser!, password);
                    adminUser!.SetPassword(hash);

                    context.Users.Add(adminUser);
                    await context.SaveChangesAsync(ct);

                    logger.LogInformation("Tài khoản Admin đã được khởi tạo: {Email}", email);
                }

                logger.LogInformation("Hoàn tất quá trình Seed dữ liệu thành công.");
            }
            catch (Exception ex)
            {
                logger.LogCritical(ex, "Lỗi nghiêm trọng trong quá trình DatabaseSeeder.");
                throw; // Re-throw để Docker/K8s biết API khởi động thất bại mà restart pod
            }
        }
    }
}
