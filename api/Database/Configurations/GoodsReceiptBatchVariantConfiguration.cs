using api.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class GoodsReceiptBatchVariantConfiguration : IEntityTypeConfiguration<GoodsReceiptBatchVariant>
    {
        public void Configure(EntityTypeBuilder<GoodsReceiptBatchVariant> builder)
        {
            builder.ToTable("GOODS_RECEIPT_BATCH_VARIANTS");

            builder.HasKey(goodsReceiptBatchVariant => goodsReceiptBatchVariant.Id);
            builder.Property(goodsReceiptBatchVariant => goodsReceiptBatchVariant.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(goodsReceiptBatchVariant => goodsReceiptBatchVariant.Quantity)
                .HasColumnName("quantity")
                .IsRequired();

            builder.Property(goodsReceiptBatchVariant => goodsReceiptBatchVariant.CostPrice)
                .HasColumnName("cost_price")
                .HasColumnType("decimal(18,2)")
                .IsRequired();

            builder.Property(goodsReceiptBatchVariant => goodsReceiptBatchVariant.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(goodsReceiptBatchVariant => goodsReceiptBatchVariant.GoodsReceiptBatchId)
                .HasColumnName("batch_id")
                .IsRequired();

            builder.HasOne(goodsReceiptBatchVariant => goodsReceiptBatchVariant.GoodsReceiptBatch)
                .WithMany(goodsReceiptBatch => goodsReceiptBatch.GoodsReceiptBatchVariants)
                .HasForeignKey(goodsReceiptBatchVariant => goodsReceiptBatchVariant.GoodsReceiptBatchId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(goodsReceiptBatchVariant => goodsReceiptBatchVariant.VariantId)
                .HasColumnName("variant_id")
                .IsRequired();

            builder.HasOne(goodsReceiptBatchVariant => goodsReceiptBatchVariant.Variant)
                .WithMany(variant => variant.GoodsReceiptBatchVariants)
                .HasForeignKey(goodsReceiptBatchVariant => goodsReceiptBatchVariant.VariantId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
