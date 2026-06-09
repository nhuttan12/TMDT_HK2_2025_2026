using api.Models.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            // 1. Tên bảng chuẩn
            builder.ToTable("INVOICES");

            // 2. Khóa chính (Primary Key)
            builder.HasKey(o => o.Id);
            builder.Property(o => o.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            // 3. Cấu hình các thuộc tính cơ bản
            // Kiểu tiền tệ bắt buộc phải khai báo precision (độ chính xác), không để EF tự suy luận gây mất mát dữ liệu
            builder.Property(o => o.TotalAmount)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            // Status đã là 'byte' trong C#, EF Core sẽ tự map thành 'tinyint' trong SQL Server.
            builder.Property(o => o.Status)
                .IsRequired();

            builder.Property(o => o.CouponId)
                .IsRequired(false); // Cho phép Null

            // 4. BẢO VỆ DOMAIN MODEL (Cực kỳ quan trọng)
            // Vì chúng ta dùng IReadOnlyCollection<OrderItem> Items và field private _items,
            // Cần nói cho EF Core biết cách gán dữ liệu vào field này khi query từ Database lên RAM.
            builder.Metadata.FindNavigation(nameof(Order.Items))!
                .SetPropertyAccessMode(PropertyAccessMode.Field);

            // 5. Mối quan hệ (1-N) với OrderItem
            builder.HasMany(o => o.Items)
                .WithOne() // OrderItem không cần Navigation Property trỏ ngược về Order để tránh lặp vòng (Circular reference)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade); // Nếu xóa Order, xóa luôn Items (Thực tế nên dùng Soft Delete cho Order)

            // 6. Đánh Index (Tối ưu hiệu năng tìm kiếm)
            // Thường xuyên query các đơn hàng theo trạng thái và thời gian tạo
            builder.HasIndex(o => new { o.Status, o.CreatedAt });
        }
    }
}
