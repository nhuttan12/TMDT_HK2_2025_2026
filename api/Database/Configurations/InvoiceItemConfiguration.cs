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
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(ii => ii.Quantity)
                .HasColumnName("quantity")
                .IsRequired();

            builder.Property(ii => ii.PriceAtPurchase)
                .HasColumnType("decimal(18,2)")
                .HasColumnName("price_at_purchase")
                .IsRequired();

            builder.HasOne(i => i.Variant)
                   .WithMany()
                   .HasForeignKey(i => i.VariantId)
                   .OnDelete(DeleteBehavior.Restrict); // Defensive Programming: Ngăn chặn xóa Variant nếu đã có Invoice

            // Ràng buộc tính vẹn toàn
            builder.Property(ii => ii.ProductId)
                .HasColumnName("product_id")
                .IsRequired();

            builder.Property(ii => ii.VariantId)
                .HasColumnName("variant_id")
                .IsRequired();

            builder.Property(ii => ii.InvoiceId)
                .HasColumnName("invoice_id")
                .IsRequired();

            // TỐI ƯU INDEX (Tránh Table Scan khi thống kê sản phẩm)
            // Phục vụ cho câu query "Tính tổng số lượng đã bán của Product A" mà không cần JOIN với bảng Orders
            builder.HasIndex(ii => ii.ProductId);

            // Phục vụ cho việc thống kê chính xác theo biến thể (VD: Áo màu đỏ bán được bao nhiêu)
            builder.HasIndex(ii => ii.VariantId);

            builder.HasOne(ii => ii.Invoice)
               .WithMany(i => i.Items) // Trỏ ngược về collection Items của Invoice
               .HasForeignKey(ii => ii.InvoiceId)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
