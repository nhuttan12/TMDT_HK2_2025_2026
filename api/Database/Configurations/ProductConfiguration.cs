using api.model.Products;
using api.Models;
using api.Models.Category;
using api.Models.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            // 1. Table Name & Primary Key
            builder.ToTable("PRODUCTS");

            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()"); // Tự động sinh GUID khi thêm mới

            // 2. Properties Configuration
            builder.Property(p => p.Name)
                .IsRequired()
                .HasColumnName("name")
                .HasMaxLength(255);

            // Tối ưu DB: Thêm Index cho Name nếu hệ thống thường xuyên search theo tên sản phẩm
            builder.HasIndex(p => p.Name);

            // Bắt buộc khai báo ColumnType cho decimal để tránh Warning và sai số (Truncation)
            builder.Property(p => p.BasePrice)
                .IsRequired()
                .HasColumnName("base_price")
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.ImageUrls)
                .HasField("_imageUrls") // BẮT BUỘC: Báo cho EF Core biết phải map trực tiếp vào private field này
                .UsePropertyAccessMode(PropertyAccessMode.Field) // Ép EF Core đọc/ghi qua field, bảo toàn Encapsulation
                .HasColumnName("image_urls")
                .IsRequired();

            builder.Property(p => p.CreatedAt)
                .HasColumnName("created_at")
                .IsRequired();

            builder.Property(p => p.UpdatedAt)
                .HasColumnName("updated_at")
                .IsRequired();

            builder.Property(p => p.CategoryId)
                .IsRequired()
                .HasColumnName("category_id");

            builder.Property(p => p.ShopId)
                .IsRequired()
                .HasColumnName("shop_id");

            builder.Property(p => p.Status)
                .IsRequired()
                .HasColumnName("status")
                .HasConversion<string>() // Lưu dưới dạng string để dễ đọc và tránh lỗi khi thay đổi enum
                .HasMaxLength(50);

            // 3. Cấu hình Backing Field (Cực kỳ quan trọng)
            // Báo cho EF Core biết hãy map trực tiếp dữ liệu vào field '_variants' 
            // bỏ qua getter của IReadOnlyCollection (để bảo toàn Encapsulation)
            builder.Metadata
                .FindNavigation(nameof(Product.Variants))!
                .SetPropertyAccessMode(PropertyAccessMode.Field);

            // 4. Relationships (Quan hệ)
            builder.Property(p => p.Rating)
                .HasColumnName("rating")
                .HasPrecision(3, 2) // Tổng 3 chữ số, 2 chữ số thập phân (Ví dụ: 4.95)
                .HasDefaultValue(0m); // Điểm mặc định khi mới tạo sản phẩm

            //// 1-N với Variant
            //builder.HasMany(p => p.Variants)
            //    .WithOne() // Variant không có navigation property ngược lại Product
            //    .HasForeignKey(v => v.ProductId)
            //    .OnDelete(DeleteBehavior.Cascade); // Xóa Product -> Xóa luôn Variants (Database level)

            // 1-1 với ProductDetail
            builder.HasOne(p => p.Detail)
                .WithOne(d => d.Product)
                .HasForeignKey<ProductDetail>(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Category>()
               .WithMany() // TRỐNG: Tham số bỏ trống chỉ định rằng Category không có collection Product
               .HasForeignKey(p => p.CategoryId)
               .HasConstraintName("FK_Products_Categories")
               .IsRequired()
               .OnDelete(DeleteBehavior.Restrict); // Defensive Programming: Không cho phép xóa Category nếu vẫn còn Product

            builder.HasOne<User>()
                 .WithMany()
                 .HasForeignKey(p => p.ShopId)
                 .HasConstraintName("FK_Products_Users_ShopId")
                 .IsRequired()
                 .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.Shop)
                   .WithMany(s => s.Products)
                   .HasForeignKey(p => p.ShopId)
                   .HasConstraintName("FK_Products_Shops_ShopId")
                   .IsRequired()
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(p => p.CategoryId)
               .HasDatabaseName("IX_Products_CategoryId");

            builder.HasIndex(p => p.ShopId)
                   .HasDatabaseName("IX_Products_ShopId");
        }
    }
}
