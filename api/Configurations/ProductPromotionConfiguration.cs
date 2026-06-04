using api.Models.Promotions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Configurations
{
    public class ProductPromotionConfiguration : IEntityTypeConfiguration<ProductPromotion>
    {
        public void Configure(EntityTypeBuilder<ProductPromotion> builder)
        {
            builder.ToTable("PRODUCT_PROMOTIONS");

            builder.HasKey(pp => pp.Id);
            builder.Property(pp => pp.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(pp => pp.Discount)
                .IsRequired()
                .HasColumnName("discount");

            builder.Property(pp => pp.Status)
                .HasColumnName("status")
                .HasDefaultValue(true);

            builder.Property(pp=>pp.CreatedAt)
                .IsRequired()
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(pp => pp.UpdatedAt)
                .IsRequired()
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(pp => pp.ProductId)
                .IsRequired()
                .HasColumnName("product_id");

            builder.HasOne(pp => pp.Product)
                .WithMany(product => product.ProductPromotions)
                .HasForeignKey(pp => pp.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(pp => pp.PromotionId)
                .IsRequired()
                .HasColumnName("promotion_id");

            builder.HasOne(pp => pp.Promotion)
                .WithMany(promotion => promotion.ProductPromotions)
                .HasForeignKey(pp => pp.PromotionId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
