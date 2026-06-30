using api.model.Products;
using api.Models;
using api.Models.Category;
using api.Models.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json;

namespace api.Database.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        // 1. Table Name & Primary Key
        builder.ToTable("PRODUCTS");

        builder.HasKey(p => p.Id);
        builder.Property(p => p.Id)
            .HasColumnName("id")
            .HasDefaultValueSql("NEWSEQUENTIALID()"); // Tự động sinh Sequential GUID tối ưu Index cây B+

        // 2. Properties Configuration
        builder.Property(p => p.Name)
            .IsRequired()
            .HasColumnName("name")
            .HasMaxLength(255);

        // Tối ưu DB: Index phục vụ cho tính năng tìm kiếm đã làm ở bước trước
        builder.HasIndex(p => p.Name)
            .HasDatabaseName("IX_Products_Name");

        builder.Property(p => p.BasePrice)
            .IsRequired()
            .HasColumnName("base_price")
            .HasColumnType("decimal(18,2)");

        builder.Property(p => p.Rating)
            .HasColumnName("rating")
            .HasPrecision(3, 2)
            .HasDefaultValue(0m);

        // FIX LỖI: Cấu hình Value Converter cho List<string> (ImageUrls) thành JSON
        builder.Property(p => p.ImageUrls)
            .HasField("_imageUrls")
            .UsePropertyAccessMode(PropertyAccessMode.Field)
            .HasColumnName("image_urls")
            .HasColumnType("nvarchar(max)")
            .HasConversion(
                v => JsonSerializer.Serialize(v, JsonSerializerOptions.Default),
                v => JsonSerializer.Deserialize<List<string>>(v, JsonSerializerOptions.Default) ?? new List<string>()
            )
            .IsRequired();

        // Đồng bộ hóa kiểu dữ liệu Datetimeoffset cho toàn bộ hệ thống
        builder.Property(p => p.CreatedAt)
            .IsRequired()
            .HasColumnName("created_at")
            .HasColumnType("datetimeoffset(7)");

        builder.Property(p => p.UpdatedAt)
            .IsRequired()
            .HasColumnName("updated_at")
            .HasColumnType("datetimeoffset(7)");

        builder.Property(p => p.CategoryId)
            .IsRequired()
            .HasColumnName("category_id");

        builder.Property(p => p.ShopId)
            .IsRequired()
            .HasColumnName("shop_id");

        builder.Property(p => p.Status)
            .IsRequired()
            .HasColumnName("status")
            .HasConversion<string>()
            .HasMaxLength(50);

        // 3. Cấu hình Backing Field cho Collection
        builder.Metadata
            .FindNavigation(nameof(Product.Variants))!
            .SetPropertyAccessMode(PropertyAccessMode.Field);

        // 4. Relationships (Quan hệ)

        // 1-1 với ProductDetail
        builder.HasOne(p => p.Detail)
            .WithOne(d => d.Product)
            .HasForeignKey<ProductDetail>(d => d.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        // ĐÃ SỬA: Loại bỏ cấu hình trùng lặp, chỉ giữ lại cấu hình tường minh nhất qua Navigation Property
        builder.HasOne(p => p.Category)
            .WithMany() // Category không giữ List<Product> để tránh luẩn quẩn (bảo toàn Aggregate Root)
            .HasForeignKey(p => p.CategoryId)
            .HasConstraintName("FK_Products_Categories_CategoryId")
            .OnDelete(DeleteBehavior.Restrict); // Chống xóa Category nếu còn ràng buộc Product

        builder.HasOne(p => p.Shop)
            .WithMany(s => s.Products)
            .HasForeignKey(p => p.ShopId)
            .HasConstraintName("FK_Products_Shops_ShopId")
            .OnDelete(DeleteBehavior.Restrict);

        // 5. Database Indexes tối ưu hóa tìm kiếm (Foreign Key Indexes)
        builder.HasIndex(p => p.CategoryId)
            .HasDatabaseName("IX_Products_CategoryId");

        builder.HasIndex(p => p.ShopId)
            .HasDatabaseName("IX_Products_ShopId");
    }
}