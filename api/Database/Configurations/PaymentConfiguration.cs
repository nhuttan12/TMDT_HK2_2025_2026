using api.Models.Payments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            // 1. Đặt tên bảng viết hoa đồng bộ với CARTS, INVOICES
            builder.ToTable("PAYMENTS");

            // 2. Khóa chính (Primary Key) sử dụng cấu hình NEWSEQUENTIALID() giống Cart
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            // 3. Khóa ngoại liên kết 1-1 với Invoice (Mối quan hệ chính giống HasOne trong Cart)
            builder.HasOne(p => p.Invoice)
                .WithOne() // Nếu bên Invoice không tạo Navigation Property trỏ ngược về Payment
                .HasForeignKey<Payment>(p => p.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade); // Xóa Invoice thì xóa lịch sử thanh toán tương ứng

            // 4. Các thuộc tính cơ bản
            builder.Property(p => p.TransactionId)
                .HasColumnName("TransactionId")
                .HasColumnType("varchar(255)")
                .IsRequired(false);

            builder.Property(p => p.Amount)
                .HasColumnName("Amount")
                .HasColumnType("decimal(19,2)")
                .IsRequired();

            // Chuyển đổi Enum PaymentMethod thành String dưới DB
            builder.Property(p => p.PaymentMethod)
                .HasColumnName("PaymentMethod")
                .HasColumnType("varchar(255)")
                .HasConversion(
                    v => v.ToString(),
                    v => (PaymentMethod)Enum.Parse(typeof(PaymentMethod), v)
                )
                .IsRequired();

            builder.Property(p => p.InformationCard)
                .HasColumnName("InformationCard")
                .HasColumnType("varchar(50)")
                .IsRequired(false);

            // Chuyển đổi Enum PaymentStatus thành String dưới DB
            builder.Property(p => p.PaymentStatus)
                .HasColumnName("Status") // Map đúng tên cột 'Status' theo sơ đồ ERD của bạn
                .HasColumnType("varchar(50)")
                .HasConversion(
                    v => v.ToString(),
                    v => (PaymentStatus)Enum.Parse(typeof(PaymentStatus), v)
                )
                .IsRequired();

            // 5. Cấu hình các cột thời gian sử dụng kiểu datetimeoffset giống như file Cart
            builder.Property(p => p.CreatedAt)
                .HasColumnName("CreatedAt")
                .HasColumnType("datetimeoffset")
                .IsRequired();

            // 6. Đánh Indexes tối ưu hiệu năng tìm kiếm
            builder.HasIndex(p => p.InvoiceId);
            builder.HasIndex(p => p.TransactionId).IsUnique();
        }
    }
}
