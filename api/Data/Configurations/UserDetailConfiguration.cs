using api.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Data.Configurations
{
    public class UserDetailConfiguration : IEntityTypeConfiguration<UserDetail>
    {
        public void Configure(EntityTypeBuilder<UserDetail> builder)
        {
            builder.ToTable("user_details");
            builder.HasKey(ud => ud.user_id);
            builder.HasOne(ud => ud.User)
               .WithOne(u => u.UserDetail)
               .HasForeignKey<UserDetail>(ud => ud.user_id)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
