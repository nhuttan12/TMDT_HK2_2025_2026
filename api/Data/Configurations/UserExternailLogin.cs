using api.Models.Users;
using demo1.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Data.Configurations
{
    public class UserExternalLoginConfiguration : IEntityTypeConfiguration<api.Models.Users.UserExternalLogin>
    {
        public void Configure(EntityTypeBuilder<UserExternalLogin> builder)
        {
            builder.ToTable("user_external_logins");
            builder.HasKey(uel => uel.user_Id);
            builder.HasOne<User>()
                .WithOne()
                .HasForeignKey<UserExternalLogin>(uel => uel.user_Id)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
