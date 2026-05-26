namespace api.Models.Users
{
    public class Shop
    {
        public Guid Id { get; private set; }

        public User User { get; private set; }

        public string Name { get; private set; }
        public string TaxCode { get; private set; }
        public string Description { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        public Shop()
        {
        }
    }
}
