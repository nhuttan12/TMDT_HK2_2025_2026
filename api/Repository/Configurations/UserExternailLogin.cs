using api.Models.Users;
using demo1.Models;
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
            builder.HasOne<User>()
                .WithOne()
                .HasForeignKey<UserExternalLogin>(uel => uel.Id)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
