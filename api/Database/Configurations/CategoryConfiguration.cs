using api.Models.Category;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("CATEGORIES");

            builder.HasKey(c => c.Id);
            // Vì Domain Entity của chúng ta đã cấp phát Id = Guid.NewGuid() tại RAM, 
            // ta cấm SQL Server tự sinh Id để tiết kiệm 1 round-trip I/O.
            builder.Property(c => c.Id)
                .HasColumnName("id")
                .ValueGeneratedNever();

            builder.Property(c => c.Name)
                .HasColumnName("name")
                .IsRequired()
                .HasMaxLength(255);
            
            builder.Property(c => c.Sku)
                .HasColumnName("sku")
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false); // Map xuống SQL là VARCHAR thay vì NVARCHAR
                                   // Bắt buộc phải có Unique Index cho SKU vì đây là trường định danh để tra cứu
            builder.HasIndex(c => c.Sku)
                   .IsUnique();

            builder.Property(c => c.ImageUrl)
               .HasColumnName("image_url")
               .HasMaxLength(500)
               .IsUnicode(false); // Map xuống SQL là VARCHAR

            builder.Property(c => c.CreatedAt)
                .IsRequired()
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset(7)"); // Tận dụng tối đa độ chính xác của SQL Server

            builder.Property(c => c.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset(7)"); // Tận dụng tối đa độ chính xác của SQL Server
        }
    }
}
