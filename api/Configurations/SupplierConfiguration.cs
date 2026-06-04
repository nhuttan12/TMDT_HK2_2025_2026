using api.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Configurations
{
    public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
    {
        public void Configure(EntityTypeBuilder<Supplier> builder)
        {
            builder.ToTable("SUPPLIERS");

            builder.HasKey(supplier => supplier.Id);
            builder.Property(supplier => supplier.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(supplier => supplier.Name).HasColumnType("varchar(100)");
            builder.Property(supplier => supplier.TaxCode)
                .HasColumnName("tax_code")
                .HasColumnType("varchar(13)");

            builder.Property(supplier => supplier.PhoneNumber)
                .HasColumnName("phone_number")
                .HasColumnType("varchar(10)");

            builder.Property(supplier => supplier.Email).HasColumnType("varchar(100)");
            builder.Property(supplier => supplier.ContactName)
                .HasColumnName("contact_name")
                .HasColumnType("varchar(100)");

            builder.Property(supplier => supplier.Address)
                .HasColumnName("address")
                .HasColumnType("varchar(100)");

            builder.Property(s=>s.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(s=>s.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");
        }
    }
}
