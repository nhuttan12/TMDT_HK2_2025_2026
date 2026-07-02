using api.Models.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            // 1. Tên bảng chuẩn
            builder.ToTable("INVOICES");

            // 2. Khóa chính (Primary Key)
            builder.HasKey(i => i.Id);
            builder.Property(i => i.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(i => i.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(i => i.ShopId)
                .HasColumnName("shop_id")
                .IsRequired(false); // Cho phép Null


            builder.Property(i => i.CreatedAt)
                .HasColumnName("created_at")
                .HasDefaultValueSql("SYSUTCDATETIME()") // Lưu thời gian theo UTC
                .ValueGeneratedOnAdd();

            builder.Property(i => i.UpdatedAt)
                .HasColumnName("updated_at")
                .HasDefaultValueSql("SYSUTCDATETIME()")
                .ValueGeneratedOnAddOrUpdate();

            // 3. Cấu hình các thuộc tính cơ bản
            // Kiểu tiền tệ bắt buộc phải khai báo precision (độ chính xác), không để EF tự suy luận gây mất mát dữ liệu
            builder.Property(i => i.TotalAmount)
                .HasColumnName("total_amount")
                .HasColumnType("decimal(18,2)")
                .IsRequired();
            builder.Property(i => i.FinalAmount)
             .HasColumnType("decimal(18,2)")
             .IsRequired();

            // Status đã là 'byte' trong C#, EF Core sẽ tự map thành 'tinyint' trong SQL Server.
            builder.Property(i => i.Status)
                .HasColumnName("status")
                .IsRequired();

            builder.Property(i => i.CouponId)
                .HasColumnName("coupon_id")
                .IsRequired(false); // Cho phép Null

            builder.Property(i => i.DeliveryId)
                .HasColumnName("delivery_id")
                .IsRequired(false);

            builder.Property(i => i.PaymentId)
                .HasColumnName("payment_id")
                .IsRequired(false);

            // 4. BẢO VỆ DOMAIN MODEL (Cực kỳ quan trọng)
            // Vì chúng ta dùng IReadOnlyCollection<InvoiceItem> Items và field private _items,
            // Cần nói cho EF Core biết cách gán dữ liệu vào field này khi query từ Database lên RAM.
            builder.Metadata.FindNavigation(nameof(Invoice.Items))!
                .SetPropertyAccessMode(PropertyAccessMode.Field);

            // 5. Mối quan hệ (1-N) với InvoiceItem
            builder.HasMany(i => i.Items)
                .WithOne(ii => ii.Invoice) // InvoiceItem không cần Navigation Property trỏ ngược về Invoice để tránh lặp vòng (Circular reference)
                .HasForeignKey(ii => ii.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade); // Nếu xóa Invoice, xóa luôn Items (Thực tế nên dùng Soft Delete cho Invoice)

            builder.HasOne(i => i.User)
                .WithMany(u => u.Invoices) // User có thể có nhiều Invoice, nhưng không cần Navigation Property trỏ ngược
                .HasForeignKey(i => i.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Không được xóa User nếu còn Invoice liên quan

            builder.HasOne(i => i.Shop)
                .WithMany(s => s.Invoices) // Shop có thể có nhiều Invoice, nhưng không cần Navigation Property trỏ ngược
                .HasForeignKey(i => i.ShopId)
                .OnDelete(DeleteBehavior.SetNull); // Nếu xóa Shop, giữ lại Invoice nhưng set ShopId thành Null

            //builder.HasOne(i => i.Payment)
            //    .WithOne(p => p.Invoice)
            //    .HasForeignKey<Invoice>(i => i.PaymentId)
            //    .OnDelete(DeleteBehavior.SetNull);


            //builder.HasOne(i => i.Delivery)
            //    .WithOne(d => d.Invoice)
            //    .HasForeignKey<Invoice>(i => i.DeliveryId)
            //    .OnDelete(DeleteBehavior.SetNull); // Xóa đơn giao hàng thì Invoice giữ nguyên thông tin gốc
            // 6. Đánh Index (Tối ưu hiệu năng tìm kiếm)
            // Thường xuyên query các đơn hàng theo trạng thái và thời gian tạo
            builder.HasIndex(i => new { i.Status, i.CreatedAt });
        }
    }
}
