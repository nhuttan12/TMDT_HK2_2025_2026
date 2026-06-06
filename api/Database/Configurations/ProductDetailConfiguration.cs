using api.Models.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class ProductDetailConfiguration : IEntityTypeConfiguration<ProductDetail>
    {
        public void Configure(EntityTypeBuilder<ProductDetail> builder)
        {
            builder.ToTable("ProductDetails");

            // 1. Tối ưu I/O: Cấu hình Shared Primary Key
            builder.HasKey(d => d.ProductId);

            // 2. Ràng buộc độ dài
            builder.Property(d => d.Summary)
                   .HasMaxLength(500)
                   .IsRequired(false); // Summary có thể cho phép null/empty

            // 3. Cấu hình kiểu dữ liệu LOB (Large Object)
            builder.Property(d => d.DescriptionHtml)
                   .HasColumnType("nvarchar(max)")
                   .IsRequired(false);

            builder.HasOne(d => d.Product)
                   .WithOne(p => p.Detail)
                   .HasForeignKey<ProductDetail>(d => d.ProductId)
                   .OnDelete(DeleteBehavior.Cascade); // Xóa chi tiết khi xóa sản phẩm
        }
    }
}
