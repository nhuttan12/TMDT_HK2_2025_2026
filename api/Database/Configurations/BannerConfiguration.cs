using api.Models.Banners;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class BannerConfiguration : IEntityTypeConfiguration<Banner>
    {
        public void Configure(EntityTypeBuilder<Banner> builder)
        {
            builder.ToTable("BANNERS");

            builder.HasKey(banner => banner.Id);
            builder.Property(banner => banner.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(banner => banner.ImageUrl)
                .IsRequired()
                .HasColumnName("image_url")
                .HasColumnType("NVARCHAR(MAX)");

            builder.Property(banner => banner.Order)
                .HasColumnName("order")
                .HasColumnType("int")
                .IsRequired();

            builder.Property(banner => banner.IsPrimary)
                .HasColumnName("is_primary")
                .IsRequired();

            builder.Property(banner => banner.Status)
                .HasColumnName("status")
                .IsRequired();

            builder.Property(banner => banner.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(banner => banner.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(banner => banner.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.HasOne(banner => banner.User)
                .WithMany(user => user.Banners)
                .HasForeignKey(banner => banner.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
