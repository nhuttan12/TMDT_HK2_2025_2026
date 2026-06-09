using api.Models.Promotions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class PromotionConfiguration : IEntityTypeConfiguration<Promotion>
    {
        public void Configure(EntityTypeBuilder<Promotion> builder)
        {
            builder.ToTable("PROMOTIONS");

            builder.HasKey(promotion => promotion.Id);
            builder.Property(promotion => promotion.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(promotion => promotion.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(promotion => promotion.Name)
                .IsRequired()
                .HasColumnName("name")
                .HasColumnType("nvarchar(255)");

            builder.Property(promotion => promotion.StartAt)
                .IsRequired()
                .HasColumnName("start_at")
                .HasColumnType("datetimeoffset");

            builder.Property(promotion => promotion.EndAt)
                .IsRequired()
                .HasColumnName("end_at")
                .HasColumnType("datetimeoffset");

            builder.Property(promotion => promotion.Status)
                .HasColumnName("status")
                .HasDefaultValue(true);

            builder.Property(promotion => promotion.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(promotion => promotion.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.HasOne(p => p.User)
                .WithMany(p => p.Promotions)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
