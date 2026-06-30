using api.Models.Payments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.ToTable("PAYMENTS");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.HasOne(p => p.Invoice)
                .WithOne()
                .HasForeignKey<Payment>(p => p.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(p => p.TransactionId)
                .HasColumnName("TransactionId")
                .HasColumnType("varchar(255)")
                .IsRequired(false);

            builder.Property(p => p.Amount)
                .HasColumnName("Amount")
                .HasColumnType("decimal(19,2)")
                .IsRequired();

            builder.Property(p => p.PaymentMethod)
                .HasColumnName("PaymentMethod")
                .HasColumnType("varchar(50)") // 255 hơi dư thừa cho Enum, 50 là đủ
                .HasConversion(
                    v => v.ToString(),
                    v => (PaymentMethod)Enum.Parse(typeof(PaymentMethod), v)
                )
                .IsRequired();

            builder.Property(p => p.InformationCard)
                .HasColumnName("InformationCard")
                .HasColumnType("varchar(50)")
                .IsRequired(false);

            // Map thêm trường RawResponse
            builder.Property(p => p.RawResponse)
                .HasColumnName("RawResponse")
                .HasColumnType("nvarchar(max)") // Lưu JSON nên dùng nvarchar(max)
                .IsRequired(false);

            builder.Property(p => p.PaymentStatus)
                .HasColumnName("Status")
                .HasColumnType("varchar(50)")
                .HasConversion(
                    v => v.ToString(),
                    v => (PaymentStatus)Enum.Parse(typeof(PaymentStatus), v)
                )
                .IsRequired();

            builder.Property(p => p.CreatedAt)
                .HasColumnName("CreatedAt")
                .HasColumnType("datetimeoffset")
                .IsRequired();

            // Cấu hình cột UpdatedAt
            builder.Property(p => p.UpdatedAt)
                .HasColumnName("UpdatedAt")
                .HasColumnType("datetimeoffset")
                .IsRequired(false);

            builder.HasIndex(p => p.InvoiceId);

            // FIX LỖI CRASH INDEX: Chỉ Unique những dòng có TransactionId khác NULL
            builder.HasIndex(p => p.TransactionId)
                   .IsUnique()
                   .HasFilter("[TransactionId] IS NOT NULL");
        }
    }
}
