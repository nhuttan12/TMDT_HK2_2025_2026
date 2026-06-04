using api.Models.Shops;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Configurations
{
    public class ShopLogoConfiguration : IEntityTypeConfiguration<ShopLogo>
    {
        public void Configure(EntityTypeBuilder<ShopLogo> builder)
        {
            builder.ToTable("SHOP_LOGOS");

            builder.HasKey(shopLogo => shopLogo.Id);
            builder.Property(shopLogo => shopLogo.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(shopLogo => shopLogo.ShopId)
                .IsRequired()
                .HasColumnName("shop_id");

            builder.Property(shopLogo => shopLogo.LogoUrl)
                .IsRequired()
                .HasColumnName("logo_url")
                .HasColumnType("nvarchar(255)");

            builder.Property(shopLogo => shopLogo.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.HasOne(shopLogo => shopLogo.Shop)
                .WithMany(shop => shop.ShopLogos)
                .HasForeignKey(shopLogo => shopLogo.ShopId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
