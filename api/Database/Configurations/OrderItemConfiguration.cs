using api.Models.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.ToTable("ORDER_ITEMS");

            builder.HasKey(oi => oi.Id);
            builder.Property(oi => oi.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(oi => oi.Quantity)
                .IsRequired();

            builder.Property(oi => oi.PriceAtPurchase)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            // Ràng buộc tính vẹn toàn
            builder.Property(oi => oi.ProductId).IsRequired();
            builder.Property(oi => oi.VariantId).IsRequired();

            // TỐI ƯU INDEX (Tránh Table Scan khi thống kê sản phẩm)
            // Phục vụ cho câu query "Tính tổng số lượng đã bán của Product A" mà không cần JOIN với bảng Orders
            builder.HasIndex(oi => oi.ProductId);

            // Phục vụ cho việc thống kê chính xác theo biến thể (VD: Áo màu đỏ bán được bao nhiêu)
            builder.HasIndex(oi => oi.VariantId);
        }
    }
}
