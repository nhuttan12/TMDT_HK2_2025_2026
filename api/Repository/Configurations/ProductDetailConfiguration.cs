using api.model.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Repository.Configurations
{
    public class ProductDetailConfiguration : IEntityTypeConfiguration<ProductDetail>
    {
        public void Configure(EntityTypeBuilder<ProductDetail> builder)
        {
            builder.ToTable("ProductDetails");

            // Cấu hình PK trùng với FK (Tối ưu chuẩn cho quan hệ 1-1)
            builder.HasKey(d => d.ProductId);

            builder.Property(d => d.Summary)
                .HasMaxLength(500);

            builder.Property(d => d.DescriptionHtml)
                // Cột chứa HTML thường lớn, nến sử dụng nvarchar(max)
                .HasColumnType("nvarchar(max)");
        }
    }
}
