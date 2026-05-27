using api.Models.Category;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Categories");
            builder.HasKey(c => c.Id);
            // Vì Domain Entity của chúng ta đã cấp phát Id = Guid.NewGuid() tại RAM, 
            // ta cấm SQL Server tự sinh Id để tiết kiệm 1 round-trip I/O.
            builder.Property(c => c.Id)
                   .ValueGeneratedNever();

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(255);
            builder.Property(c => c.Sku)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false); // Map xuống SQL là VARCHAR thay vì NVARCHAR
                                   // Bắt buộc phải có Unique Index cho SKU vì đây là trường định danh để tra cứu
            builder.HasIndex(c => c.Sku)
                   .IsUnique();
            builder.Property(c => c.ImageUrl)
               .HasMaxLength(500)
               .IsUnicode(false); // Map xuống SQL là VARCHAR
            builder.Property(c => c.CreatedAt)
                .IsRequired()
                .HasColumnType("datetimeoffset(7)"); // Tận dụng tối đa độ chính xác của SQL Server
        }
    }
}
