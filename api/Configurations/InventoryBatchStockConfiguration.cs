using api.Models.Inventory;
using api.Models.Inventory.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace api.Configurations
{
    public class InventoryBatchStockConfiguration : IEntityTypeConfiguration<InventoryBatchStock>
    {
        public void Configure(EntityTypeBuilder<InventoryBatchStock> builder)
        {
            builder.ToTable("INVENTORY_BATCH_STOCKS");

            builder.HasKey(inventoryBatchStock => inventoryBatchStock.Id);
            builder.Property(inventoryBatchStock => inventoryBatchStock.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(InventoryBatchStock => InventoryBatchStock.RemainingQuantity)
                .IsRequired()
                .HasColumnName("remaining_quantity");

            var typeConverter = new ValueConverter<InventoryBatchStockStatus, string>(
                v => v.ToString().ToLower(),
                v => (InventoryBatchStockStatus)Enum.Parse(typeof(InventoryBatchStockStatus), v, true)
            );
            builder.Property(inventoryBatchStock => inventoryBatchStock.Status)
                .HasConversion(typeConverter)
                .HasColumnName("status")
                .HasColumnType("varchar(20)")
                .IsRequired();

            builder.Property(inventoryBatchStock => inventoryBatchStock.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(inventoryBatchStock => inventoryBatchStock.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(inventoryBatchStock => inventoryBatchStock.VariantId)
                .IsRequired()
                .HasColumnName("variant_id");

            builder.HasOne(inventoryBatchStock => inventoryBatchStock.Variant)
                .WithMany(variant => variant.InventoryBatchStocks)
                .HasForeignKey(inventoryBatchStock => inventoryBatchStock.VariantId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(inventoryBatchStock => inventoryBatchStock.ProductId)
                .IsRequired()
                .HasColumnName("product_id");

            builder.HasOne(inventoryBatchStock => inventoryBatchStock.Product)
                .WithMany(product => product.InventoryBatchStocks)
                .HasForeignKey(inventoryBatchStock => inventoryBatchStock.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(inventoryBatchStock => inventoryBatchStock.BatchId)
                .IsRequired()
                .HasColumnName("batch_id");

            builder.HasOne(inventoryBatchStock => inventoryBatchStock.Batch)
                .WithOne(goodsReceiptBatch => goodsReceiptBatch.InventoryBatchStock)
                .HasForeignKey<InventoryBatchStock>(inventoryBatchStock => inventoryBatchStock.BatchId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
