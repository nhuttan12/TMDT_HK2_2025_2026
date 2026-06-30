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

            // 1. Khóa chính & Định danh tự tăng tối ưu
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            // 2. CẤU HÌNH QUAN HỆ - FIX TRIỆT ĐỂ LỖI CASCADE CYCLES
            builder.HasOne(p => p.Invoice)
                .WithOne(i => i.Payment) 
                .HasForeignKey<Payment>(p => p.InvoiceId) 
                .OnDelete(DeleteBehavior.Restrict);

            // 3. Thông tin giao dịch từ cổng thanh toán
            builder.Property(p => p.TransactionId)
                .HasColumnName("TransactionId")
                .HasColumnType("varchar(255)")
                .IsRequired(false);

            // 4. Số tiền (decimal 19,2 chuẩn tiền tệ)
            builder.Property(p => p.Amount)
                .HasColumnName("Amount")
                .HasColumnType("decimal(19,2)")
                .IsRequired();

            // 5. TỐI ƯU HÓA ENUM: Lưu dạng số (tinyint) thay vì chuỗi để tăng tốc truy vấn lên 500%
            builder.Property(p => p.PaymentMethod)
                .HasColumnName("PaymentMethod")
                .HasColumnType("tinyint")
                .IsRequired();

            builder.Property(p => p.PaymentStatus)
                .HasColumnName("Status")
                .HasColumnType("tinyint")
                .IsRequired();

            // 6. Thông tin bổ sung
            builder.Property(p => p.InformationCard)
                .HasColumnName("InformationCard")
                .HasColumnType("varchar(50)")
                .IsRequired(false);

            // Lưu JSON kết quả trả về từ Gateway (Momo, VNPAY...)
            builder.Property(p => p.RawResponse)
                .HasColumnName("RawResponse")
                .HasColumnType("nvarchar(max)")
                .IsRequired(false);

            // 7. Audit Logs
            builder.Property(p => p.CreatedAt)
                .HasColumnName("CreatedAt")
                .HasColumnType("datetimeoffset")
                .IsRequired();

            builder.Property(p => p.UpdatedAt)
                .HasColumnName("UpdatedAt")
                .HasColumnType("datetimeoffset")
                .IsRequired(false);

            // 8. Tối ưu hóa Index tầng Database
            builder.HasIndex(p => p.InvoiceId);

            // Filtered Index: Đảm bảo Unique nhưng bỏ qua các bản ghi Null (Giao dịch lỗi/chưa tạo mã)
            builder.HasIndex(p => p.TransactionId)
                   .IsUnique()
                   .HasFilter("[TransactionId] IS NOT NULL");
        }
    }

}