using api.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Configurations
{
    public class UserBankingConfiguration : IEntityTypeConfiguration<UserBanking>
    {
        public void Configure(EntityTypeBuilder<UserBanking> builder)
        {
            builder.ToTable("USER_BANKINGS");

            builder.HasKey(userBanking => userBanking.Id);
            builder.Property(userBanking => userBanking.Id)
                .HasDefaultValueSql("NEWSEQUENTIALID()");
            
            builder.Property(userBanking => userBanking.BankName)
                .IsRequired()
                .HasColumnName("bank_name")
                .HasColumnType("nvarchar(255)");


            builder.Property(userBanking => userBanking.AccountName)
                .IsRequired()
                .HasColumnName("account_name")
                .HasColumnType("nvarchar(255)");

            builder.Property(userBanking => userBanking.AccountNumber)
                .IsRequired()
                .HasColumnName("account_number")
                .HasColumnType("varchar(20)");

            builder.Property(userBanking => userBanking.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(userBanking => userBanking.UpdatedAt)
                .HasColumnName("updated_at")
                .HasColumnType("datetimeoffset")
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(userBanking => userBanking.UserId)
                .IsRequired()
                .HasColumnName("user_id");

            builder.HasOne(userBanking => userBanking.User)
                .WithMany(user => user.UserBankings)
                .HasForeignKey(userBanking => userBanking.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
