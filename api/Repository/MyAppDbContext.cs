using api.Models.Users;
using api.Models;
using api.Models.Products;
using Microsoft.EntityFrameworkCore;
using api.Models.Roles;
using Api.Models.Users;
using api.model.Products;
namespace api.Repository
{
    public class MyAppDbContext : DbContext
    {
        public MyAppDbContext(DbContextOptions<MyAppDbContext> options)
            : base(options)
        {
        }
        // Treat these as the entry points for LINQ queries against the DB.
        
        public DbSet<api.Models.User> Users { get; set; }
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
