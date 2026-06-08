using api.Models.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class VariantConfiguration : IEntityTypeConfiguration<Variant>
    {
        public void Configure(EntityTypeBuilder<Variant> builder)
        {
            builder.ToTable("VARIANTS");

            builder.HasKey(v => v.Id);
            // Tối ưu I/O: Cấm SQL Server tự sinh ID vì ta đã dùng Guid.NewGuid() ở C#
            builder.Property(v => v.Id).HasColumnName("id").ValueGeneratedNever();
            builder.Property(v => v.Name)
                 .HasColumnName("name")
                 .IsRequired()
                 .HasMaxLength(100);

            // TỐI ƯU STORAGE & MEMORY: Ép về VARCHAR
            builder.Property(v => v.Sku)
                   .HasColumnName("sku")
                   .IsRequired()
                   .HasMaxLength(100)
                   .IsUnicode(false);

            builder.Property(v => v.ImageUrl)
                 .HasColumnName("image_url")
                 .HasMaxLength(500)
                 .IsUnicode(false);

            // Ánh xạ Enum xuống SQL dưới dạng Integer (Tốn 4 byte thay vì nvarchar)
            builder.Property(v => v.Status)
                   .HasColumnName("status")
                   .HasConversion<int>()
                   .IsRequired();

            builder.Property(v => v.CostPrice).HasColumnName("cost_price").HasColumnType("decimal(18,2)");
            builder.Property(v => v.SellPrice).HasColumnName("sell_price").HasColumnType("decimal(18,2)");

            // INDEXING STRATEGY
            // 1. SKU phải duy nhất TRÊN TOÀN HỆ THỐNG để phục vụ quét mã vạch máy tít
            builder.HasIndex(v => v.Sku)
                   .IsUnique()
                   .HasDatabaseName("IX_Variants_Sku");

            // 2. Index cho ProductId để khi truy vấn Product.Include(p => p.Variants) không bị Table Scan
            builder.HasIndex(v => v.ProductId)
                   .HasDatabaseName("IX_Variants_ProductId");
        }
    }
}
