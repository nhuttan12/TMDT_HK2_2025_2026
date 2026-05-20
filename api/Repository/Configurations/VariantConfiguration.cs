using api.model.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Repository.Configurations
{
    public class VariantConfiguration : IEntityTypeConfiguration<Variant>
    {
        public void Configure(EntityTypeBuilder<Variant> builder)
        {
            builder.ToTable("ProductVariants");
            builder.HasKey(v => v.Id);

            builder.Property(v => v.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(v => v.Price)
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(v => v.ImageUrl)
                .HasMaxLength(500);

            // Bảo vệ Concurrency: Không cho phép 2 Variant trùng tên trong cùng 1 Product
            builder.HasIndex(v => new { v.ProductId, v.Name })
                .IsUnique();
        }
    }
}
