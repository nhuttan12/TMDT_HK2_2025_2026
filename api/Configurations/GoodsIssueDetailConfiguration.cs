using api.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Configurations
{
    public class GoodsIssueDetailConfiguration : IEntityTypeConfiguration<GoodsIssueDetail>
    {
        public void Configure(EntityTypeBuilder<GoodsIssueDetail> builder)
        {
            builder.ToTable("GOODS_ISSUE_DETAILS");

            builder.HasKey(goodsIssueDetail => goodsIssueDetail.Id);
            builder.Property(goodsIssueDetail => goodsIssueDetail.Id).HasDefaultValueSql("NEWSEQUENTIALID()");

            builder.Property(goodsIssueDetail => goodsIssueDetail.Quantity).IsRequired();

            builder.Property(goodsIssueDetail => goodsIssueDetail.SellingPrice)
                .HasColumnName("selling_price")
                .IsRequired()
                .HasColumnType("decimal(18,2)");

            builder.Property(goodsIssueDetail => goodsIssueDetail.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(goodsIssueDetail => goodsIssueDetail.IssueId)
                .HasColumnName("issue_id")
                .IsRequired();

            builder.HasOne(goodsIssueDetail => goodsIssueDetail.GoodsIssue)
                .WithMany(goodsIssue => goodsIssue.GoodsIssueDetails)
                .HasForeignKey(goodsIssueDetail => goodsIssueDetail.IssueId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(goodsIssueDetail => goodsIssueDetail.VariantId)
                .HasColumnName("variant_id")
                .IsRequired();

            builder.HasOne(goodsIssueDetail => goodsIssueDetail.Variant)
                .WithMany(variant => variant.GoodsIssueDetails)
                .HasForeignKey(goodsIssueDetail => goodsIssueDetail.VariantId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
