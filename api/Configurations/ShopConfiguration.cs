using api.Models.Shops;
using api.Models.Shops.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace api.Configurations
{
    public class ShopConfiguration : IEntityTypeConfiguration<Shop>
    {
        public void Configure(EntityTypeBuilder<Shop> builder)
        {
            builder.ToTable("SHOPS");

            builder.HasKey(shop => shop.Id);
            builder.Property(shop => shop.Id).HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(shop => shop.Name)
                .IsRequired()
                .HasColumnName("name")
                .HasColumnType("nvarchar(255)");

            var StatusConverter = new ValueConverter<EShopStatus, string>(
                status => status.ToString().ToLower(),
                status => (EShopStatus)Enum.Parse(typeof(EShopStatus), status, true)
            );
            builder.Property(shop => shop.Status)
                .HasConversion(StatusConverter)
                .HasColumnName("status")
                .HasColumnType("varchar(50)");

            builder.Property(shop => shop.TaxCode)
                .HasColumnName("tax_code")
                .HasColumnType("nvarchar(50)");

            builder.Property(shop => shop.Description)
                .HasColumnName("description")
                .HasColumnType("NVARCHAR(MAX)");

            builder.Property(shop => shop.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(shop => shop.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.HasOne(shop => shop.User)
                .WithOne(user => user.Shop)
                .HasForeignKey<Shop>(shop => shop.Id)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
