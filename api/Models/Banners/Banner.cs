namespace api.Models.Banners
{
    public class Banner
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }

        public User? User { get; private set; }

        public string ImageUrl { get; private set; }
        public int Order { get; private set; }
        public bool IsPrimary { get; private set; }
        public bool Status { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        public Banner(Guid id, Guid userId, string imageUrl, bool status, DateTimeOffset createdAt, DateTimeOffset updatedAt)
        {
            Id = id;
            UserId = userId;
            ImageUrl = imageUrl;
            Status = status;
            CreatedAt = createdAt;
            UpdatedAt = updatedAt;
        }
    }
}
