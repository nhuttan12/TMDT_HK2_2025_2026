namespace api.Models.Promotions
{
    public class Promotion
    {
        public Guid Id { get; private set; }

        public Guid UserId { get; private set; }
        public User User { get; private set; }

        public string Name { get; private set; }
        public DateTimeOffset StartAt { get; private set; }
        public DateTimeOffset EndAt { get; private set; }
        public bool Status { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        public ICollection<ProductPromotion> ProductPromotions { get; private set; } = new HashSet<ProductPromotion>();

        public Promotion() { }
    }
}
