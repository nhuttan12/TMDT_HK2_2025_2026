using api.Models.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class DeliveryConfiguration : IEntityTypeConfiguration<Delivery>
    {
        public void Configure(EntityTypeBuilder<Delivery> builder)
        {
            // 1. Tên bảng chuẩn (Viết hoa đồng bộ với INVOICES)
            builder.ToTable("DELIVERIES");

            // 2. Khóa chính (Primary Key)
            builder.HasKey(d => d.Id);
            builder.Property(d => d.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            // 3. Khóa ngoại liên kết
            builder.Property(d => d.InvoiceId)
                .HasColumnName("invoice_id")
                .IsRequired();

            builder.Property(d => d.AddressId)
                .HasColumnName("address_id")
                .IsRequired();

            // 4. Cấu hình các thuộc tính cơ bản dựa trên sơ đồ ERD cũ của bạn
            builder.Property(d => d.ReceiverPhone)
                .HasColumnName("receiver_phone")
                .HasColumnType("varchar(255)")
                .IsRequired();

            builder.Property(d => d.ReceiverName)
                .HasColumnName("receiver_name")
                .HasColumnType("nvarchar(255)") // Sử dụng nvarchar để hỗ trợ tiếng Việt có dấu
                .IsRequired();

            builder.Property(d => d.ShippingFee)
                .HasColumnName("shipping_fee")
                .HasColumnType("decimal(18,2)") // Đảm bảo độ chính xác của tiền tệ
                .IsRequired();

            // Ánh xạ trạng thái Enum (Sử dụng byte/tinyint giống InvoiceStatus để tối ưu lưu trữ)
            builder.Property(d => d.ShippingStatus)
                .HasColumnName("shipping_status")
                .IsRequired();

            // 5. Mối quan hệ quan trọng (Relationships)
            // Cấu hình đầu ngược lại của mối quan hệ 1-1 với Invoice
            builder.HasOne(d => d.Invoice)
              .WithOne(i => i.Delivery)
              .HasForeignKey<Delivery>(d => d.InvoiceId)
              .OnDelete(DeleteBehavior.Cascade);

            // Cấu hình mối quan hệ với thực thể Address (Giả định Address có thể liên kết với nhiều Delivery)
            builder.HasOne(d => d.Address)
                .WithMany() // Nếu bên class Address không có Navigation Property trỏ về tập hợp Deliveries
                .HasForeignKey(d => d.AddressId)
                .OnDelete(DeleteBehavior.Restrict); // Không được xóa địa chỉ nếu đang có đơn giao hàng liên kết

            // 6. Đánh Index (Tối ưu hiệu năng tìm kiếm đơn giao hàng)
            builder.HasIndex(d => d.InvoiceId).IsUnique(); // Đảm bảo tính duy nhất 1-1 ở tầng DB
            builder.HasIndex(d => d.ShippingStatus);
        }
    }
}
