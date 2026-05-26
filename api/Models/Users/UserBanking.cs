namespace api.Models.Users
{
    public class UserBanking
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }

        public User User { get; private set; }

        public string BankName { get; private set; }
        public string AccountName { get; private set; }
        public string AccountNumber { get; private set; }

        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }
    }
}
