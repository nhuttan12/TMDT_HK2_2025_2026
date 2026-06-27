using api.Models.Cards;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.ToTable("CART_ITEMS");

            builder.HasKey(ci => ci.Id);

            // Cấu hình bắt buộc cho số lượng và giá trị mặc định tối thiểu
            builder.Property(ci => ci.Quantity)
                   .IsRequired()
                   .HasDefaultValue(1);

            // Cấu hình mối quan hệ với sản phẩm biến thể (Variant)
            builder.HasOne(ci => ci.Variant)
                   .WithMany()
                   .HasForeignKey(ci => ci.VariantId)
                   .OnDelete(DeleteBehavior.Restrict); // Nghiêm cấm xóa Variant nếu đang có người để trong giỏ
        }
    }
}
