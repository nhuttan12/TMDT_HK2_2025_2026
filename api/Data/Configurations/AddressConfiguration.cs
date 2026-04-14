using api.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Data.Configurations
{
    public class AddressConfiguration : IEntityTypeConfiguration<Address>
    {
        public void Configure(EntityTypeBuilder<Address> builder)
        {
            builder.ToTable("addresses");
            builder.HasKey(a => a.id);
            builder.Property(a => a.id).UseIdentityByDefaultColumn();
            builder.Property(a => a.user_id).IsRequired();
            builder.Property(a => a.address_url).IsRequired();
            builder.Property(a => a.create_at).IsRequired();
            builder.Property(a => a.is_used).IsRequired();
        }
    }
}
