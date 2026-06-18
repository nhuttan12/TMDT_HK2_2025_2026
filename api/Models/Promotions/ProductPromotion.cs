using api.model.Products;

namespace api.Models.Promotions
{
    public class ProductPromotion
    {
        public Guid Id { get; private set; }
        public Guid PromotionId { get; private set; }

        public Promotion Promotion { get; private set; }

        public Guid ProductId { get; private set; }

        public Product Product { get; private set; }

        public decimal DiscountPrice { get; private set; }
        public bool Status { get; private set; }

        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        public ProductPromotion() { }
    }
}
