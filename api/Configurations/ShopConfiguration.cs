using api.Models.Inventory;
using api.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

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

            builder.Property(shop => shop.Description)
                .HasColumnName("description")
                .HasColumnType("text");

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
