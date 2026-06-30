using api.Models.Enums.Inventory;
using api.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;

namespace api.Database.Configurations
{
    public class GoodsReceiptConfiguration : IEntityTypeConfiguration<GoodsReceipt>
    {
        public void Configure(EntityTypeBuilder<GoodsReceipt> builder)
        {
            builder.ToTable("GOODS_RECEIPTS");

            builder.HasKey(goodsReceipt => goodsReceipt.Id);
            builder.Property(goodsReceipt => goodsReceipt.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(goodsReceipt => goodsReceipt.Code)
                .HasColumnName("code")
                .HasColumnType("varchar(50)");

            builder.Property(goodsReceipt => goodsReceipt.Note)
                .HasColumnName("note")
                .HasColumnType("NVARCHAR(MAX)");

            builder.Property(goodsReceipt => goodsReceipt.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset");

            var typeConverter = new ValueConverter<EGoodsReceiptType, string>(
                v => JsonNamingPolicy.SnakeCaseLower.ConvertName(v.ToString()),
                v => (EGoodsReceiptType)Enum.Parse(typeof(EGoodsReceiptType), v.Replace("_", ""), true)
            );
            builder.Property(goodsReceipt => goodsReceipt.Type)
                .HasConversion(typeConverter)
                .HasColumnName("type")
                .HasColumnType("varchar(50)")
                .IsRequired();

            var statusConverter = new ValueConverter<EGoodsReceiptStatus, string>(
                v => JsonNamingPolicy.SnakeCaseLower.ConvertName(v.ToString()),
                v => (EGoodsReceiptStatus)Enum.Parse(typeof(EGoodsReceiptStatus), v.Replace("_", ""), true)
            );
            builder.Property(goodsReceipt => goodsReceipt.Status)
                .HasConversion(statusConverter)
                .HasColumnName("status")
                .HasColumnType("varchar(50)")
                .IsRequired();

            builder.Property(goodsReceipt => goodsReceipt.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(goodsReceipt => goodsReceipt.SupplierId)
                .HasColumnName("supplier_id")
                .IsRequired();

            builder.Property(goodsReceipt => goodsReceipt.ShopId)
                .HasColumnName("shop_id")
                .IsRequired();

            builder.HasOne(goodsReceipt => goodsReceipt.Supplier)
                .WithMany(supplier => supplier.GoodsReceipts)
                .HasForeignKey(goodsReceipt => goodsReceipt.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(goodsReceipt => goodsReceipt.Shop)
                .WithMany(shop => shop.GoodsReceipts)
                .HasForeignKey(goodsReceipt => goodsReceipt.ShopId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
