namespace api.Models.Users
{
    public class UserBanking
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }

        public User? User { get; private set; }

        public string BankName { get; private set; }
        public string AccountName { get; private set; }
        public string AccountNumber { get; private set; }

        public bool Status { get; private set; }

        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        public UserBanking(Guid id, Guid userId, string bankName, string accountName, string accountNumber, DateTimeOffset createdAt, DateTimeOffset updatedAt)
        {
            Id = id;
            UserId = userId;
            BankName = bankName;
            AccountName = accountName;
            AccountNumber = accountNumber;
            CreatedAt = createdAt;
            UpdatedAt = updatedAt;
        }
    }
}
