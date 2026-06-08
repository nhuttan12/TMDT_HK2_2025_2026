using api.Models;
using api.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace api.Database.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<User> builder)
        {
            // Map to explicit table name using lower case to align with
            // typical Postgres naming conventions.
            builder.ToTable("USERS");

            // Primary key configuration. UseIdentityByDefaultColumn maps
            // to Postgres identity/serial semantics for auto-incrementing ids.
            builder.HasKey(e => e.Id);
            builder.Property(p => p.Id)
                .HasColumnName("id")
                .HasDefaultValueSql("NEWSEQUENTIALID()"); // Tự động sinh GUID khi thêm mới
            // Email is essential for user accounts; enforce required and a
            // sensible maximum length to avoid overly large values.
            builder.Property(e => e.Email)
                .HasColumnName("email")
                .IsRequired()
                .HasMaxLength(150);
            
            builder.Property(u=>u.Phone)
                .HasColumnName("phone");

            builder.Property(u => u.PasswordHash)
                .HasColumnName("password_hash");

            builder.Property(u => u.FullName)
                .HasColumnName("full_name");

            builder.Property(u => u.CreateAt)
                .HasColumnName("create_at")
                .HasColumnType("datetimeoffset");

            builder.Property(u => u.UpdateAt)
                .HasColumnName("update_at")
                .HasColumnType("datetimeoffset");

            builder.Property(u => u.DeleteAt)
                .HasColumnName("delete_at")
                .HasColumnType("datetimeoffset");

            builder.Property(u => u.RoleId)
                .HasColumnName("role_id")
                .IsRequired();

            // Relationship: a User belongs to a Role. Restrict deletion of
            // a Role when users reference it to prevent accidental data loss.
            builder.HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // Quan hệ với UserExternalLogin
            builder.HasOne(u => u.UserExternalLogin)
                   .WithOne(uel => uel.User) // Cung cấp thuộc tính điều hướng ngược lại
                   .HasForeignKey<UserExternalLogin>(uel => uel.Id)
                   .OnDelete(DeleteBehavior.Cascade);

            // Quan hệ với UserDetail
            builder.HasOne(u => u.UserDetail)
                   .WithOne(ud => ud.User) // Cung cấp thuộc tính điều hướng ngược lại
                   .HasForeignKey<UserDetail>(ud => ud.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            // quan hệ với Address
            builder.HasMany(u => u.Addresses)
                .WithOne(ad => ad.User)
                .HasForeignKey(ad => ad.UserId)
                .OnDelete(DeleteBehavior.Cascade);// Xóa User thì xóa luôn Address
        }
    }
}
