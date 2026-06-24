using api.Models.Products;

namespace api.Models.Cards
{
    public class CartItem
    {
        public Guid Id { get; private set; }
        public Guid CartId { get; private set; }

        public Cart Cart { get; private set; } = default!;

        public Guid VariantId { get; private set; }
        public Variant Variant { get; private set; } = default!;

        public int Quantity { get; private set; }

        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset? UpdatedAt { get; private set; }

        protected CartItem() { }

        internal CartItem(Guid id, Guid cartId, Guid variantId, int quantity)
        {
            Id = id;
            CartId = cartId;
            VariantId = variantId;
            Quantity = quantity;
        }

        internal void IncreaseQuantity(int amount)
        {
           this.Quantity += amount;
        }
        internal void UpdateQuantity(int amount)
        {
            this.Quantity = amount;
        }

        internal static CartItem Create(Guid guid, Guid cartId, Guid variantId, int quantity)
        {
            return new CartItem(guid, cartId, variantId, quantity);
        }
    }
}
