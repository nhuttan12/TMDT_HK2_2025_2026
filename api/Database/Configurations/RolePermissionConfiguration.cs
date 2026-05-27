using api.Models.Roles;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations
{
    public class RolePermissionConfiguration
    //: IEntityTypeConfiguration<RolePermission>
    {
        public void Configure(EntityTypeBuilder<RolePermission> builder)
        {
            //// Table naming: use snake_case to match Postgres conventions.
            //// This makes raw SQL and DB inspection more predictable.
            //builder.ToTable("role_permissions");

            //// Composite primary key: prevents duplicate role-permission pairs
            //// and models the many-to-many join table explicitly.
            //builder.HasKey(rp => new { rp.RoleId, rp.PermissionId });

            //// Relationship to Roles: one Role -> many RolePermissions.
            //// Use Cascade delete here so that removing a Role cleans up
            //// related join rows. Adjust to Restrict if you need stronger
            //// protection against accidental deletes.
            //builder.HasOne(rp => rp.Role)
            //      .WithMany(r => r.RolePermissions)
            //      .HasForeignKey(rp => rp.RoleId)
            //      .OnDelete(DeleteBehavior.Cascade); // Thường dùng Cascade cho bảng trung gian

            //// Relationship to Permissions: one Permission -> many RolePermissions.
            //// Also cascade delete to remove orphaned join rows when a
            //// Permission is deleted.
            //builder.HasOne(rp => rp.Permission)
            //      .WithMany(p => p.RolePermissions)
            //      .HasForeignKey(rp => rp.PermissionId)
            //      .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
