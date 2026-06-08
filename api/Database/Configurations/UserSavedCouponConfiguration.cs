using api.Models.Coupons;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class UserSavedCouponConfiguration : IEntityTypeConfiguration<UserSavedCoupon>
    {
        public void Configure(EntityTypeBuilder<UserSavedCoupon> builder)
        {
            builder.ToTable("USER_SAVED_COUPONS");

            builder.HasKey(usc => usc.Id);

            builder.Property(usc => usc.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(usc => usc.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(usc => usc.CouponId)
                .HasColumnName("coupon_id")
                .IsRequired();

            builder.Property(usc => usc.IsUsed)
                .HasColumnName("is_used")
                .IsRequired();

            builder.Property(usc => usc.SavedAt)
                .HasColumnName("saved_at")
                .IsRequired()
                .HasColumnType("datetimeoffset");

            builder.Property(usc => usc.LastUsedAt)
                .HasColumnName("last_used_at")
                .HasColumnType("datetimeoffset");

            builder.HasOne(usc => usc.User)
               .WithMany(u => u.UserSavedCoupons)
               .HasForeignKey(usc => usc.UserId)
               .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(usc => usc.Coupon)
               .WithMany(c => c.UserSavedCoupons)
               .HasForeignKey(usc => usc.CouponId)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
