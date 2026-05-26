using api.Models.Banners;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Configurations
{
    public class BannerConfiguration : IEntityTypeConfiguration<Banner>
    {
        public void Configure(EntityTypeBuilder<Banner> builder)
        {
            builder.ToTable("BANNERS");

            builder.HasKey(banner => banner.Id);
            builder.Property(banner => banner.Id).HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(banner => banner.ImageUrl)
                .IsRequired()
                .HasColumnName("image_url")
                .HasColumnType("text");

            builder.Property(banner => banner.Status)
                .HasColumnName("status");

            builder.Property(banner => banner.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(banner => banner.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.HasOne(banner => banner.User)
                .WithMany(user => user.Banners)
                .HasForeignKey(banner => banner.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
