using api.Models;
using api.Models.Roles;
using api.Services.Auths;
using Microsoft.EntityFrameworkCore;

namespace api.Utilities
{
    public class DbInitializer
    {
        public static async Task SeedEverything(DbContext myAppDBContext, IConfiguration config, IAuthService _authService)
        {
            //  Đảm bảo Database đã được tạo
            await myAppDBContext.Database.MigrateAsync();
            string emailAccount = config[key: "InitialSetup:Email"] ?? "Null";
            string passwordAccount = config[key: "InitialSetup:Password"] ?? "Null";
            List<string> roles = config.GetSection("InitialSetup:RoleList")
                .GetChildren()
                .Select(x => x.Value)
                .Where(v => v != null)
                .Select(v => v!)
                .ToList();

            if (emailAccount == "Null" || passwordAccount == "Null" || roles.Count == 0)
            {
                throw new Exception("Initial setup configuration is missing or invalid.");
            }

            List<Role> roleList = myAppDBContext.Set<Role>().ToList();
            foreach (var role in roles)
            {
                if (!roleList.Any(r => r.Name == role))
                {
                    var newRole = new Role(role)
                    {
                        Name = role,
                        Description = $"Role for {role}"
                    };
                    myAppDBContext.Set<Role>().Add(newRole);
                }
            }
            await myAppDBContext.SaveChangesAsync();

            var Account = await myAppDBContext.Set<User>()
                .FirstOrDefaultAsync(a => a.Email == emailAccount);
            if (Account == null)
            {
                var newUser = new User
                {
                    Email = emailAccount,
                    PasswordHash = "",
                    CreateAt = DateTime.UtcNow,
                    Role = myAppDBContext.Set<Role>().FirstOrDefault(r => r.Name == "Admin")!
                };
                newUser.PasswordHash = _authService.HashPassword(newUser, passwordAccount);
                myAppDBContext.Set<User>().Add(newUser);
            }

            await myAppDBContext.SaveChangesAsync();

        }
    }
}
