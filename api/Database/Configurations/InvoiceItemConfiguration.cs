using api.Models.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class InvoiceItemConfiguration : IEntityTypeConfiguration<InvoiceItem>
    {
        public void Configure(EntityTypeBuilder<InvoiceItem> builder)
        {
            builder.ToTable("INVOICE_ITEMS");

            builder.HasKey(ii => ii.Id);
            builder.Property(ii => ii.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(ii => ii.Quantity)
                .IsRequired();

            builder.Property(ii => ii.PriceAtPurchase)
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            // Ràng buộc tính vẹn toàn
            builder.Property(ii => ii.ProductId).IsRequired();
            builder.Property(ii => ii.VariantId).IsRequired();

            // TỐI ƯU INDEX (Tránh Table Scan khi thống kê sản phẩm)
            // Phục vụ cho câu query "Tính tổng số lượng đã bán của Product A" mà không cần JOIN với bảng Orders
            builder.HasIndex(ii => ii.ProductId);

            // Phục vụ cho việc thống kê chính xác theo biến thể (VD: Áo màu đỏ bán được bao nhiêu)
            builder.HasIndex(ii => ii.VariantId);
        }
    }
}
