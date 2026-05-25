using api.Models;
using api.Models.Roles;
using api.Models.Users;
using api.Services.Auths;
using Microsoft.EntityFrameworkCore;

namespace api.Utilities
{
    public class DbInitializer
    {
       // Senior Tip: Sử dụng Static class cho Utility và nhận IServiceProvider để quản lý Scope tốt hơn
    public static async Task SeedEverything(
        DbContext context, 
        IConfiguration config, 
        IAuthService authService,
        ILogger logger, // Luôn cần Logger để giám sát hệ thống
        CancellationToken ct = default)
    {
        try
        {
            logger.LogInformation("Bắt đầu quá trình khởi tạo và Seed dữ liệu Database...");

            // 1. Áp dụng Migration (Chỉ khi đã có bản Migration khớp với Model)
            await context.Database.MigrateAsync(ct);

            // 2. Lấy cấu hình từ appsettings.json/Environment
            var email = config["InitialSetup:Email"];
            var password = config["InitialSetup:Password"];
            var roles = config.GetSection("InitialSetup:RoleList").Get<List<string>>();

            // Defensive Programming: Fail Fast
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) || roles == null || !roles.Any())
            {
                logger.LogError("Cấu hình InitialSetup thiếu thông tin nghiêm trọng!");
                return;
            }

            // 3. Xử lý Roles (Sử dụng IQueryable để tối ưu truy vấn)
            var existingRoles = await context.Set<Role>().ToListAsync(ct);
            foreach (var roleName in roles)
            {
                if (!existingRoles.Any(r => r.Name == roleName))
                {
                    context.Set<Role>().Add(Role.Create(roleName));
                    logger.LogInformation("Thêm Role mới: {RoleName}", roleName);
                }
            }
            await context.SaveChangesAsync(ct);

            // 4. Xử lý Admin Account
            var adminExists = await context.Set<User>().AnyAsync(u => u.Email == email, ct);
            //if (!adminExists)
            {
                // Lấy Role Admin vừa tạo hoặc đã có
                var adminRole = await context.Set<Role>()
                    .FirstOrDefaultAsync(r => r.Name == "Admin", ct);

                if (adminRole == null)
                {
                    logger.LogCritical("Không thể tạo Admin vì thiếu Role 'Admin' trong cấu hình!");
                    return;
                }

                var adminUser = User.Create(email, adminRole, "local", "local");
               
                adminUser.PasswordHash = authService.HashPassword(adminUser, password);
                context.Set<User>().Add(adminUser);
                
                await context.SaveChangesAsync(ct);
                logger.LogInformation("Tài khoản Admin đã được khởi tạo: {Email}", email);
            }

            logger.LogInformation("Hoàn tất quá trình Seed dữ liệu thành công.");
        }
        catch (Exception ex)
        {
            logger.LogCritical(ex, "Lỗi nghiêm trọng trong quá trình DbInitializer.");
            throw; // Re-throw để hệ thống không khởi động nếu DB lỗi
        }
    }
    }
}
