using api.Models.Enums.Shops;
using api.Models.Shops;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;

namespace api.Database.Configurations
{
    public class ShopConfiguration : IEntityTypeConfiguration<Shop>
    {
        public void Configure(EntityTypeBuilder<Shop> builder)
        {
            builder.ToTable("SHOPS");

            builder.HasKey(shop => shop.Id);
            builder.Property(shop => shop.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(shop => shop.Name)
                .IsRequired()
                .HasColumnName("name")
                .HasColumnType("nvarchar(255)");
            
            builder.Property(shop => shop.Rating)
                .HasColumnName("rating")
                .HasColumnType("int");

            var StatusConverter = new ValueConverter<EShopStatus, string>(
                v => JsonNamingPolicy.SnakeCaseLower.ConvertName(v.ToString()),
                v => (EShopStatus)Enum.Parse(typeof(EShopStatus), v.Replace("_", ""), true)
            );
            builder.Property(shop => shop.Status)
                .HasConversion(StatusConverter)
                .HasColumnName("status")
                .HasColumnType("varchar(50)");

            var SystemStatusConverter = new ValueConverter<EShopSystemStatus, string>(
                v => JsonNamingPolicy.SnakeCaseLower.ConvertName(v.ToString()),
                v => (EShopSystemStatus)Enum.Parse(typeof(EShopSystemStatus), v.Replace("_", ""), true)
            );
            builder.Property(shop => shop.SystemStatus)
                .HasConversion(SystemStatusConverter)
                .HasColumnName("system_status")
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

            builder.Property(s => s.ShopLogo)
                .HasColumnName("shop_logo")
                .HasColumnType("nvarchar(max)");

            builder.HasOne(shop => shop.User)
                .WithOne(user => user.Shop)
                .HasForeignKey<Shop>(shop => shop.Id)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
