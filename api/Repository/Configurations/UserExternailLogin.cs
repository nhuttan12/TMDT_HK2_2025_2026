using api.Models.Users;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Repository.Configurations
{
    public class UserExternalLoginConfiguration : IEntityTypeConfiguration<UserExternalLogin>
    {
        public void Configure(EntityTypeBuilder<UserExternalLogin> builder)
        {
            builder.ToTable("user_external_logins");
            builder.HasKey(uel => uel.Id);
            // Tắt tính năng tự tăng ID (Identity)
            builder.Property(uel => uel.Id)
                   .ValueGeneratedNever();

            builder.HasOne(uel => uel.User)
                .WithOne( u => u.UserExternalLogin)
                .HasForeignKey<UserExternalLogin>(uel => uel.Id)
                .OnDelete(DeleteBehavior.Cascade);

            // 4. Đánh Index cho cặp Provider/ExternalId để tăng tốc độ Login
            builder.HasIndex(uel => new { uel.Provider, uel.Id }).IsUnique();
        }
    }
}
