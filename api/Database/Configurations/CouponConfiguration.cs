using api.Models.Coupons;
using api.Models.Enums.Coupons;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;

namespace api.Database.Configurations
{
    public class CouponConfiguration : IEntityTypeConfiguration<Coupon>
    {
        public void Configure(EntityTypeBuilder<Coupon> builder)
        {
            builder.ToTable("COUPONS");

            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                .IsRequired()
                .HasColumnName("id");

            builder.Property(c => c.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(c => c.Code)
                .IsRequired()
                .HasColumnType("varchar(50)")
                .HasColumnName("code");

            builder.Property(c => c.Name)
                .IsRequired()
                .HasColumnType("varchar(255)")
                .HasColumnName("name");

            var ScopeConverter = new ValueConverter<ECouponScope, string>(
                v => JsonNamingPolicy.SnakeCaseLower.ConvertName(v.ToString()),
                v => (ECouponScope)Enum.Parse(typeof(ECouponScope), v.Replace("_", ""), true)
            );
            builder.Property(c => c.Scope)
                .HasConversion(ScopeConverter)
                .HasColumnName("scope")
                .HasColumnType("varchar(20)");

            var CategoryConverter = new ValueConverter<ECouponCategory, string>(
                v => JsonNamingPolicy.SnakeCaseLower.ConvertName(v.ToString()),
                v => (ECouponCategory)Enum.Parse(typeof(ECouponCategory), v.Replace("_", ""), true)
            );
            builder.Property(c => c.Category)
                .HasConversion(CategoryConverter)
                .HasColumnName("category")
                .HasColumnType("varchar(20)");

            var TypeConverter = new ValueConverter<ECouponType, string>(
                v => JsonNamingPolicy.SnakeCaseLower.ConvertName(v.ToString()),
                v => (ECouponType)Enum.Parse(typeof(ECouponType), v.Replace("_", ""), true)
            );
            builder.Property(c => c.Type)
                .HasConversion(TypeConverter)
                .HasColumnName("type")
                .HasColumnType("varchar(20)");

            builder.Property(c => c.DiscountValue)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasColumnName("discount_value");

            builder.Property(c => c.MaxDiscountAmount)
                .HasColumnType("decimal(18,2)")
                .HasColumnName("max_discount_amount");

            builder.Property(c => c.MinInvoiceValue)
                .HasColumnType("decimal(18,2)")
                .HasColumnName("min_invoice_value");

            builder.Property(c => c.TotalQuantity)
                .IsRequired()
                .HasColumnName("total_quantity");

            builder.Property(c => c.UsedQuantity)
                .IsRequired()
                .HasColumnName("used_quantity");

            builder.Property(c => c.StartAt)
                .IsRequired()
                .HasColumnName("start_at");

            builder.Property(c => c.EndAt)
                .IsRequired()
                .HasColumnName("end_at");

            builder.Property(c => c.Status)
                .IsRequired()
                .HasColumnName("status");

            builder.Property(c => c.CreatedAt)
                .HasColumnType("datetimeoffset")
                .HasColumnName("created_at")
                .HasDefaultValueSql("GETDATE()");

            builder.Property(c => c.UpdatedAt)
                .HasColumnType("datetimeoffset")
                .HasColumnName("updated_at")
                .HasDefaultValueSql("GETDATE()");

            builder.HasOne(c => c.User)
                .WithMany(u => u.Coupons)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
