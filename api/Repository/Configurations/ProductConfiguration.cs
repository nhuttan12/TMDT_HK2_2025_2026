using api.model.Products;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Repository.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            // 1. Table Name & Primary Key
            builder.ToTable("Products");
            builder.HasKey(p => p.Id);

            // 2. Properties Configuration
            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(255);

            // Tối ưu DB: Thêm Index cho Name nếu hệ thống thường xuyên search theo tên sản phẩm
            builder.HasIndex(p => p.Name);

            // Bắt buộc khai báo ColumnType cho decimal để tránh Warning và sai số (Truncation)
            builder.Property(p => p.BasePrice)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.CreatedAt)
                .IsRequired();

            builder.Property(p => p.UpdatedAt)
                .IsRequired();

            // 3. Cấu hình Backing Field (Cực kỳ quan trọng)
            // Báo cho EF Core biết hãy map trực tiếp dữ liệu vào field '_variants' 
            // bỏ qua getter của IReadOnlyCollection (để bảo toàn Encapsulation)
            builder.Metadata
                .FindNavigation(nameof(Product.Variants))!
                .SetPropertyAccessMode(PropertyAccessMode.Field);

            // 4. Relationships (Quan hệ)

            // 1-N với Variant
            builder.HasMany(p => p.Variants)
                .WithOne() // Variant không có navigation property ngược lại Product
                .HasForeignKey(v => v.ProductId)
                .OnDelete(DeleteBehavior.Cascade); // Xóa Product -> Xóa luôn Variants (Database level)

            // 1-1 với ProductDetail
            builder.HasOne(p => p.Detail)
                .WithOne(d => d.Product)
                .HasForeignKey<ProductDetail>(d => d.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
