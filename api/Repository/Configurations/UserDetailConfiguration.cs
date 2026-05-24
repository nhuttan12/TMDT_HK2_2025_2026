using api.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Repository.Configurations
{
    public class UserDetailConfiguration : IEntityTypeConfiguration<UserDetail>
    {
        public void Configure(EntityTypeBuilder<UserDetail> builder)
        {
            builder.ToTable("UserDetails");
            builder.HasKey(ud => ud.UserId);
            builder.HasOne(ud => ud.User)
               .WithOne(u => u.UserDetail)
               .HasForeignKey<UserDetail>(ud => ud.UserId)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
