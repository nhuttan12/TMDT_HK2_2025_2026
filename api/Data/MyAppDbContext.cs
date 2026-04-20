using api.Models.Users;
using demo1.Models;
using demo1.Models.Products;
using demo1.Models.Roles;
using Microsoft.EntityFrameworkCore;
namespace demo1.Data
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options)
            : base(options)
        {
        }
        // Treat these as the entry points for LINQ queries against the DB.
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Role> Roles { get; set; }
        //public DbSet<Permission> Permissions { get; set; }
        //public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<Address> Address { get; set; } 
        public DbSet<UserExternalLogin> UserExternalLogins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Tự động tìm và nạp tất cả Class implement IEntityTypeConfiguration trong Assembly
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MyAppDbContext).Assembly);

        }
    }
}
