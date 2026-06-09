using api.Models.Coupons;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class InvoiceAppliedCouponConfiguration : IEntityTypeConfiguration<InvoiceAppliedCoupon>
    {
        public void Configure(EntityTypeBuilder<InvoiceAppliedCoupon> builder)
        {
            builder.ToTable("INVOICE_APPLIED_COUPONS");

            builder.HasKey(iac => iac.Id);
            builder.Property(iac => iac.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(iac => iac.InvoiceId)
                .HasColumnName("invoice_id")
                .IsRequired();

            builder.Property(iac => iac.CouponId)
                .HasColumnName("coupon_id")
                .IsRequired();

            builder.Property(iac => iac.DiscountAmount)
                .HasColumnName("discount_amount")
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(iac => iac.AppliedAt)
                .HasColumnName("applied_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.HasOne(iac => iac.Invoice)
               .WithMany(i => i.AppliedCoupons)
               .HasForeignKey(iac => iac.InvoiceId)
               .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(iac => iac.Coupon)
               .WithMany(c => c.AppliedInvoices)
               .HasForeignKey(iac => iac.CouponId)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
