using api.Models.Inventory;
using api.Models.Inventory.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace api.Configurations
{
    public class GoodsReceiptConfiguration : IEntityTypeConfiguration<GoodsReceipt>
    {
        public void Configure(EntityTypeBuilder<GoodsReceipt> builder)
        {
            builder.ToTable("GOODS_RECEIPTS");

            builder.HasKey(goodsReceipt => goodsReceipt.Id);
            builder.Property(goodsReceipt => goodsReceipt.Id).HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(goodsReceipt => goodsReceipt.Code).HasColumnType("varchar(50)");
            builder.Property(goodsReceipt => goodsReceipt.Note).HasColumnType("text");
            builder.Property(goodsReceipt => goodsReceipt.CreatedAt).HasColumnType("datetimeoffset");

            var typeConverter = new ValueConverter<GoodsReceiptType, string>(
                v => v.ToString().ToLower(),
                v => (GoodsReceiptType)Enum.Parse(typeof(GoodsReceiptType), v, true)
            );
            builder.Property(goodsReceipt => goodsReceipt.Type)
                .HasConversion(typeConverter)
                .HasColumnType("varchar(50)")
                .IsRequired();

            var statusConverter = new ValueConverter<GoodsReceiptStatus, string>(
                v => v.ToString().ToLower(),
                v => (GoodsReceiptStatus)Enum.Parse(typeof(GoodsReceiptStatus), v, true)
            );
            builder.Property(goodsReceipt => goodsReceipt.Status)
                .HasConversion(statusConverter)
                .HasColumnType("varchar(50)")
                .IsRequired();

            builder.Property(goodsReceipt => goodsReceipt.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(goodsReceipt => goodsReceipt.SupplierId)
                .HasColumnName("supplier_id")
                .IsRequired();

            builder.HasOne(goodsReceipt => goodsReceipt.Supplier)
                .WithMany(supplier => supplier.GoodsReceipts)
                .HasForeignKey(goodsReceipt => goodsReceipt.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
