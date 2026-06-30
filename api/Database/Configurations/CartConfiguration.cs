using api.Models.Cards;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class CartConfiguration : IEntityTypeConfiguration<Cart>
    {
        public void Configure(EntityTypeBuilder<Cart> builder)
        {
            builder.ToTable("CARTS");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .HasColumnName("Id")
                .HasDefaultValueSql("NEWSEQUENTIALID()");
            builder.HasOne(c => c.User)
               .WithMany()
               .HasForeignKey(c => c.UserId)
               .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(c => c.Items)
               .WithOne(i => i.Cart)
               .HasForeignKey(i => i.CartId)
               .OnDelete(DeleteBehavior.Cascade);
            builder.Navigation(c => c.Items)
               .UsePropertyAccessMode(PropertyAccessMode.Field);

            builder.Property(u => u.UpdatedAt)
                .HasColumnName("update_at")
                .HasColumnType("datetimeoffset");

            builder.Property(u => u.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset");
        }
    }
}
