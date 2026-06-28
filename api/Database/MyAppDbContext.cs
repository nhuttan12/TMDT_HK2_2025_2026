using api.model.Products;
using api.Models;
using api.Models.Category;
using api.Models.Orders;
using api.Models.Products;
using api.Models.Roles;
using api.Models.Users;
using api.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using Api.Models.Users;
using api.Models.Shops;
using api.Models.Cards;
namespace api.Database
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
        public DbSet<ProductDetail> ProductDetails { get; set; }
        public DbSet<Variant> Variants { get; set; }
        public DbSet<Role> Roles { get; set; }
        //public DbSet<Permission> Permissions { get; set; }
        //public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<UserDetail> UserDetails { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<UserExternalLogin> UserExternalLogins { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<Invoice> Orders { get; set; }
        public DbSet<InvoiceItem> OrderItems { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<GoodsReceipt> GoodsReceipts { get; set; }

        public DbSet<Shop> Shops { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        public DbSet<InventoryBatchStock> InventoryBatchStock { get; set; }
        public DbSet<Invoice> invoices { get; set; }
        public DbSet<InvoiceItem> invoiceItems { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Tự động tìm và nạp tất cả Class implement IEntityTypeConfiguration trong Assembly
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MyAppDbContext).Assembly);

        }
    }
}
