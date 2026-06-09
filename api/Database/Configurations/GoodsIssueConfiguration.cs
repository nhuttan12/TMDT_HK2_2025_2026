using api.Models.Inventory;
using api.Models.Inventory.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace api.Database.Configurations
{
    public class GoodsIssueConfiguration : IEntityTypeConfiguration<GoodsIssue>
    {
        public void Configure(EntityTypeBuilder<GoodsIssue> builder)
        {
            builder.ToTable("GOODS_ISSUES");

            builder.HasKey(goodsIssue => goodsIssue.Id);
            builder.Property(goodsIssue => goodsIssue.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(goodsIssue => goodsIssue.Code)
                .HasColumnName("code")
                .HasColumnType("varchar(50)");

            builder.Property(goodsIssue => goodsIssue.Note)
                .HasColumnName("note")
                .HasColumnType("NVARCHAR(MAX)");

            var typeConverter = new ValueConverter<GoodsIssueType, string>(
                type => type.ToString().ToLower(),
                type => (GoodsIssueType)Enum.Parse(typeof(GoodsIssueType), type, true)
            );
            builder.Property(goodsIssue => goodsIssue.GoodsIssueType)
                .HasConversion(typeConverter)
                .HasColumnName("type")
                .HasColumnType("varchar(20)");

            builder.Property(goodsIssue => goodsIssue.CreatedAt)
               .HasColumnName("created_at")
               .HasColumnType("datetimeoffset")
               .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(goodsIssue => goodsIssue.CustomerId)
                .HasColumnName("customer_id")
                .IsRequired();

            builder.HasOne(goodsIssue => goodsIssue.Customer)
                .WithMany(customer => customer.GoodsIssues)
                .HasForeignKey(goodsIssue => goodsIssue.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
