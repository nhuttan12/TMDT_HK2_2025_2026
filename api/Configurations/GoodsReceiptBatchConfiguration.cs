using api.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Configurations
{
    public class GoodsReceiptBatchConfiguration : IEntityTypeConfiguration<GoodsReceiptBatch>
    {
        public void Configure(EntityTypeBuilder<GoodsReceiptBatch> builder)
        {
            builder.ToTable("GOODS_RECEIPT_BATCHES");

            builder.HasKey(goodsReceiptBatch => goodsReceiptBatch.Id);
            builder.Property(goodsReceiptBatch => goodsReceiptBatch.Id).HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(goodsReceiptBatch => goodsReceiptBatch.BatchCode)
                .HasColumnType("varchar(50)")
                .IsRequired();

            builder.Property(goodsReceiptBatch => goodsReceiptBatch.Quantity)
                   .IsRequired();
            builder.ToTable(t => t.HasCheckConstraint("CK_GoodsReceiptBatch_Quantity", "[Quantity] > 0"));

            builder.Property(goodsReceiptBatch => goodsReceiptBatch.TotalCostPrice)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(goodsReceiptBatch => goodsReceiptBatch.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(goodsReceiptBatch => goodsReceiptBatch.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(goodsReceiptBatch => goodsReceiptBatch.GoodsReceiptId)
                .HasColumnName("goods_receipt_id")
                .IsRequired();

            builder.HasOne(goodsReceiptBatch => goodsReceiptBatch.GoodsReceipt)
                .WithMany(goodsReceipt => goodsReceipt.GoodsReceiptBatch)
                .HasForeignKey(goodsReceiptBatch => goodsReceiptBatch.GoodsReceiptId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
