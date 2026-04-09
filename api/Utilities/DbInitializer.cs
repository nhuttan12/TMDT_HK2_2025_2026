using demo1.Models;
using demo1.Models.Roles;
using demo1.Services.Auths;
using Microsoft.EntityFrameworkCore;

namespace demo1.Utilities
{
    public class DbInitializer
    {
        public static async Task SeedEverything(DbContext myAppDBContext, IConfiguration config, IAuthService _authService)
        {
            //  Đảm bảo Database đã được tạo
            await myAppDBContext.Database.MigrateAsync();
            string nameAccount = config[key: "InitialSetup:Name"] ?? "Null";
            string emailAccount = config[key: "InitialSetup:Email"] ?? "Null";
            string passwordAccount = config[key: "InitialSetup:Password"] ?? "Null";
            List<string> roles = config.GetSection("InitialSetup:RoleList")
                .GetChildren()
                .Select(x => x.Value)
                .Where(v => v != null)
                .Select(v => v!)
                .ToList();

            if (nameAccount == "Null" || emailAccount == "Null" || passwordAccount == "Null" || roles.Count == 0)
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
                .FirstOrDefaultAsync(a => a.Username == nameAccount);
            if (Account == null)
            {
                var newUser = new User
                {
                    Username = nameAccount,
                    Email = emailAccount,
                    PasswordHash = "",
                    CreateAt = DateTime.UtcNow,
                    Role = myAppDBContext.Set<Role>().FirstOrDefault(r => r.Name == "Admin")!
                };
                newUser.PasswordHash = _authService.hashPassword(newUser, passwordAccount);
                myAppDBContext.Set<User>().Add(newUser);
            }

            await myAppDBContext.SaveChangesAsync();

        }
    }
}
